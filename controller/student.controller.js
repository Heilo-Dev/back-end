const studentServices = require("../services/student.services")


exports.ondemand = async (req, res, next) => {
    try {
        const result = await studentServices.getAllByFilter(req.query)
        console.log(result);

        res.status(200).json({
            status: "success",
            found: result?.count,
            result: result?.result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}



exports.updaterStudentProfile = async (req, res, next) => {
    try {
        const { email } = req.user
        const user = await studentServices.getStudentFindByEmail(email)
        console.log("user ",user);
        if (user.role != "student") {
            return res.status(401).json({
                status: "fail",
                error: "not authorized for this route"
            })
        }

        const result = await studentServices.updaterStudentProfile(email,req.body)
        
        res.status(200).json({
            status: "success",
            result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}