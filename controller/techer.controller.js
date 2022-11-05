const services = require("../services/teacher.services");
const { errorHandler } = require("../middleware/errorHandler");

exports.getTecherByEmailController = async (req, res, next) => {
    try {
        const result = await services.getTecherByEmailService(req.query.email)
        res.status(200).json({
            status: "Success",
            message: "data fetching Successfully",
            result: result
        })

    } catch (err) {
        errorHandler(res, err)
    }
}
exports.createATeacherController = async (req, res, next) => {
    try {
        const result = await services.createATecherService(req.body)
        console.log(req.body);
        res.status(200).json({
            status: "Success",
            message: "Save a document Successfully",
            // result: result
        })
    }
    catch (err) {
        // res.status(400).json({
        //     status: "failed",
        //     message: err.message
        // })
        errorHandler(res, err)
    }
}

exports.updateATeacherController = async (req, res, next) => {
    try {
        // console.log(req.query.email, req.body)
        const result = await services.updateATeacherServices(req.query.email, req.body)

        res.status(200)
            .json({
                status:"success",
                result: result
            })

    }
    catch (err) {
        console.log(err);
        errorHandler(res, err)
    }
}