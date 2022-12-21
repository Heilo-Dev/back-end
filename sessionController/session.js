/*
 * student will req for the new session start;
 * The Teacher will receive the req from the student and ans with (YES OR NO);
 * the will generate and store to the temp_session_DB;
 * */

//user model;
const User = require("../model/User");

const getReqFromStudent = async (req, res) => {
  try {
    //verify the student
    const options = req.body.options;
    if (options) {
      //create new session;
      //implement the google events;
      //save the event into the database;
    }
  } catch (e) {
    console.log(e);
  }
};
