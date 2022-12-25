const { google } = require("googleapis");
const session = require("../model/Session");
const UserWallet = require("../model/UserWallate");
const user = require("../model/User");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

exports.createSession = async (data) => {
  //create table for this data
  const result = new session(data);
  return await result.save();
};

exports.confirmSession = async (id, status) => {
  //update the session table
  //status will be true or false

  const updateSession = await session.updateOne(
    { _id: id },
    { status: status },
    { runValidators: true }
  );
  return updateSession;
};

exports.generateSessionLink = async (id) => {
  //get the session data form create session table and pass it by data variable
  //and create temporary link generate table in DB

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
  };
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  const auth = new google.auth.GoogleAuth({
    keyFile: "fluted-sentry-326911-17a0711168e9.json",
    scopes: SCOPES,
  });

  auth.getClient().then((auth) => {
    calendar.events.insert(
      {
        auth: auth,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
      },
      function (err, event) {
        if (err) {
          return err;
        }
        const data = event.data;
      }
    );
  });
};

exports.decrementBalance = async (id) => {
  const { studentId, teacherId } = await session.findOne({ _id: id });
  const { email } = await user.findOne({ _id: studentId });
  const { hourlyRate } = await user.findOne({ _id: teacherId });
  console.log(studentId, teacherId, email, hourlyRate);
  return await UserWallet.updateOne(
    { email },
    { $inc: { balance: -hourlyRate } }
  );
};
