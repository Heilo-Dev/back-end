const studentServices = require("../services/student.services")


exports.ondemand = async (req, res, next) => {
    try {



        const { gender, range, subject, availability, topic, limit, id } = req.query;

        let filter = {}

        if (gender) {
            filter.gender = gender

        }
        if (range) {
            filter.hourlyRate = {
                "$lte": (+req.query.range)
            }


        }
        if (subject) {
            filter["tuitionSubjects.name"] = subject
        }

        if (availability) {
            filter.availability = availability;
        }

        const result = await studentServices.onDemangetAllByFilter(filter)
        // console.log(result);

        if (result.result.length == 0) {
            return res.status(200).json({
                status: "Not found"
            })
        }

        res.status(200).json({
            status: "success",
            found: result.count[0].found,
            result: result.result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}



exports.updateStudentProfile = async (req, res, next) => {
    try {
        const { email } = req.user
        console.log(email);
        // const user = await studentServices.getStudentFindByEmail(email)
        console.log("user ", user);
        if (user.role != "student") {
            return res.status(401).json({
                status: "fail",
                error: "not authorized for this route"
            })
        }

        const result = await studentServices.updaterStudentProfile(email, req.body)

        res.status(200).json({
            status: "success",
            result
        })

    } catch (error) {
        // console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}

exports.topUpReqController = async (req, res, next) => {
    try {
        const { email, role, _id } = req.user;
        const { trxId, amount, operator } = req.body;
        if (!operator || !trxId || !amount) {
            return res.status(500).json({
                status: "fail",
                message: "Empty property can't accepted"
            })
        }
        const data = { email, role, _id, trxId, amount, operator }


        const result = await studentServices.topUp_ReqService(data)

        res.status(200).json({
            result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error?.message,

        })
    }
}

exports.getWallateControler = async (req, res, next) => {
    try {

        const result = await studentServices.getWallateService(req.user)

        res.status(200).json({
            status: "Success",
            result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "internal server error"
        })
    }
}