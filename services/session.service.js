const { google } = require("googleapis");
const session = require("../model/Session");
const UserWallet = require("../model/UserWallate");
const user = require("../model/User");
const tempDB = require("../model/tempDB");

const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  //process.env.REDIRECT_URI
  "http://localhost:3000"
);

//refresh_token should be come form DB, update this code
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: oauth2Client,
});

//remove this function and implement it in the register function
// exports.createAccount = async (data) => {
//   //create table for this data
//   const { tokens } = await oauth2Client.getToken(data);
//   console.log(tokens, "tokens");
// };

exports.createSession = async (data) => {
  //create table for this data
  const result = new session(data);
  return await result.save();
};

exports.confirmSession = async (id, status) => {
  //update the session table
  //status will be true or false
  //check given session id is on the DB if exits then create new one session otherwise it will create a session
  // const data = { message: "please create an new session!" };
  // const isSession = await session.findById({ _id: id });

  // if (!isSession) {
  const updateSession = await session.updateOne(
    { _id: id },
    { status: status },
    { runValidators: true }
  );
  return updateSession;
  // } else {
  //   return data;
  // }
};

exports.generateSessionLink = async (id, eventData) => {
  //get the session data form create session table and pass it by data variable
  //and create temporary link generate table in DB
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const getTheSessionData = await session.findOne({ _id: id });

  let event = {
    summary: getTheSessionData.summary,
    location: getTheSessionData.location,
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: getTheSessionData.start_time,
      timeZone: getTheSessionData.timeZone,
    },
    end: {
      dateTime: getTheSessionData.end_time,
      timeZone: getTheSessionData.timeZone,
    },
    attendees: [],

    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: makeid(10),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  await calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
    },
    function (err, event) {
      if (err) {
        console.log(err);
        return err;
      }
      eventData(event.data);
    }
  );
};

exports.decrementBalance = async (id) => {
  const { studentId, teacherId } = await session.findOne({ _id: id });
  const { hourlyRate } = await user.findOne({ _id: teacherId });

  return await UserWallet.updateOne(
    { studentId },
    { $inc: { balance: -hourlyRate } }
  );
};

exports.allEvents = async (getAllEvents) => {
  calendar.events.list(
    {
      auth: auth,
      calendarId: GOOGLE_CALENDAR_ID,
      // timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        getAllEvents(error.message);
      } else {
        // if (result.data.items.length) {
        //   getAllEvents(result.data.items);
        // } else {
        //   getAllEvents("No upcoming events found.");
        // }
        getAllEvents(result.data.items);
      }
    }
  );
};

exports.tempDb = async (data) => {
  const { teacherId } = await session.findOne({ _id: data.sessionId });
  const { hourlyRate } = await user.findOne({ _id: teacherId });
  const { sessionId, generated_link } = data;
  const tempData = {
    sessionId,
    order_money: hourlyRate,
    generated_link,
  };

  const result = new tempDB(tempData);
  return await result.save();
};
