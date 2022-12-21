const { CreateSession } = require("../services/session.service");

//create session req from student
exports.getSessionRequest = async (req, res) => {
  const studentId = req.query.studentId;
  const data = {
    //user info
    student_id: studentId,
    teacher_id: req.body.teacher_id,
    summary: req.body.summary,
    location: req.body.location,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    timeZone: req.body.timeZone,
    attendees: req.body.attendees,
    status: req.body.status,
  };

  const getSession = await sessionRequest(data);
};

exports.sessionControllers = async (req, res) => {
  const data = {
    summary: req.body.summary,
    location: req.body.location,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    timeZone: req.body.timeZone,
    attendees: [req.body.attendees],
  };

  const createSession = await generateSessionLink(data);
};
