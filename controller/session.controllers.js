const {
  createSession,
  generateSessionLink,
  confirmSession,
  decrementBalance,
} = require("../services/session.service");

//create session req from student
exports.getSessionRequest = async (req, res) => {
  try {
    const studentId = req.query.student;
    const data = {
      //user info
      studentId: studentId,
      teacherId: req.body.teacher_id,
      summary: req.body.summary,
      location: req.body.location,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      timeZone: req.body.timeZone,
      hourlyRate: req.body.hourlyRate,
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
  try {
    const id = req.body.id; //session id
    const status = req.body.status;
    await confirmSession(id, status);
    if (status === "accept") {
      /**before the generate link access the wallet and decrement the money by teacher hour rate
       * and the hold it another DB
       */

      //decrement the balance form student wallet
      const dec = await decrementBalance(id);

      //link generate
      const generateLink = await generateSessionLink(id);

      res.status(200).json({
        status: "success",
        message: "Request update Successfully",
        data: {
          generateLink,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Request failed Successfully",
      error: error.message,
    });
  }
};
