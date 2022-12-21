const { google } = require("googleapis");
const { calendar } = require("googleapis/build/src/apis/calendar");

const SCOPES = process.env.SCOPES;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

exports.createSession = async (data) => {
  //create table for this data
};
exports.generateSessionLink = () => {
  //get the session data form create session table and pass it by data variable
  //and create temporary link generate table in DB
  let event = {
    summary: data.summary,
    location: data.location,
    description: data.description,
    start: {
      dateTime: data.startTime,
      timeZone: data.timeZone,
    },
    end: {
      dateTime: data.endTime,
      timeZone: data.timeZone,
    },
    attendees: [data.attendees],
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
    keyFile: "/fluted-sentry-326911-17a0711168e9.json",
    scopes: "https://www.googleapis.com/auth/calendar",
  });

  auth.getClient().then((a) => {
    calendar.events.insert(
      {
        auth: a,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event created: %s", event.data);
        res.jsonp("Event successfully created!");
      }
    );
  });
};
