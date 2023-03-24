const {
  createSession,
  generateSessionLink,
  confirmSession,
  decrementBalance,
  allEvents,
  tempDb,
  createAccount,
} = require("../services/session.service");

exports.createAccount = async (req, res) => {
  try {
    const { code } = req.body.tokenRes;
    createAccount(code);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
//create session req from student
exports.getSessionRequest = async (req, res) => {
  try {
    const studentId = req.query.student;
    const eventsData = {
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
    const getSession = await createSession(eventsData);
    res.status(202).json({
      status: "success",
      message: "Request Send Successfully",
      data: getSession,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Request failed Successfully",
      error: error,
    });
  }
};

exports.confirmSession = async (req, res) => {
  try {
    const id = req.body.session_id; //session id
    const status = req.body.status;
    //confirm session
    const sessionData = await confirmSession(id, status);

    // if (!sessionData.message) {
    if (status === "accept") {
      /**before the generate link access the wallet and decrement the money by teacher hour rate
       * and the hold it another DB
       */
      //decrement the balance form student wallet
      await decrementBalance(id);
      //link generate
      const eventData = async (data) => {
        //store the sessionID, order_money, generated link in tempDB;

        const tempData = {
          sessionId: id,
          generated_link: data.hangoutLink,
        };

        const result = await tempDb(tempData);
        res.status(200).json({
          status: "success",
          message: "Request update Successfully",
          data: { data, result },
        });
      };
      await generateSessionLink(id, eventData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Request failed Successfully",
      error: error.message,
    });
  }
};

exports.getTheEvents = async (req, res) => {
  try {
    const getAllEvents = (data) => {
      res.status(400).json({
        status: "success",
        message: "Request success",
        data: data,
      });
    };
    await allEvents(getAllEvents);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Request failed",
      error: error.message,
    });
  }
};
