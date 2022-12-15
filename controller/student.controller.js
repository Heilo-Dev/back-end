const studentServices = require("../services/student.services");

exports.ondemand = async (req, res, next) => {
  try {
    const { gender, range, subject, availability, topic, limit, id } =
      req.query;

    let filter = {};

    if (gender) {
      filter.gender = gender;
    }
    if (range) {
      filter.hourlyRate = {
        $lte: +req.query.range,
      };
    }
    if (subject) {
      filter["tuitionSubjects.name"] = subject;
    }

    if (availability) {
      filter.availability = availability;
    }

    const result = await studentServices.getAllByFilter(filter);
    // console.log(result);

    if (result.result.length == 0) {
      return res.status(200).json({
        status: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      found: result.count[0].found,
      result: result.result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updaterStudentProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await studentServices.getStudentFindByEmail(email);
    console.log("user ", user);
    if (user.role != "student") {
      return res.status(401).json({
        status: "fail",
        error: "not authorized for this route",
      });
    }

    const result = await studentServices.updaterStudentProfile(email, req.body);

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
