const {
  createSession,
  generateSessionLink,
  confirmSession,
} = require("../services/session.service");

//create session req from student
exports.getSessionRequest = async (req, res) => {
  try {
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

    const getSession = await createSession(data);
    res.status(202).json({
      status: "success",
      message: "Request Send Successfully",
      data: getSession,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Request failed Successfully",
      error: error.message,
    });
  }
};

exports.confirmSession = async (req, res) => {
  const status = req.body.status;
  const confirmReq = confirmSession(status);

  if (confirmReq.status) {
    /**before the generate link access the wallet and decrement the money by teacher hour rate
     * and the hold it another DB
     */

    const generateLink = generateSessionLink(confirmReq);
  }
};
