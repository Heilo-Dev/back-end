const express = require("express");
const { google } = require("googleapis");
const { calendar } = require("googleapis/build/src/apis/calendar");

const app = express();

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = "fluted-sentry-326911";
const GOOGLE_CLIENT_EMAIL =
  "heilo-292@fluted-sentry-326911.iam.gserviceaccount.com";
const GOOGLE_PROJECT_NUMBER = "113388075456";
const GOOGLE_CALENDAR_ID = "rshaon09@gmail.com";

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

app.get("/", (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
});

app.get("/createEvent", (req, res) => {
  let event = {
    summary: "My first event!",
    location: "Hyderabad,India",
    description: "First event with nodeJS!",
    start: {
      dateTime: "2022-01-12T09:00:00-07:00",
      timeZone: "Asia/Dhaka",
    },
    end: {
      dateTime: "2022-01-14T17:00:00-07:00",
      timeZone: "Asia/Dhaka",
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
});
