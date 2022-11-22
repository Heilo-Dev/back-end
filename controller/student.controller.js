const studentServices = require("../services/student.services")


exports.ondemand = async (req, res, next) => {
    try {

        // console.log("query ", query);
        let filter = {}
        // if (req.query.gender) {
        //     gender = req.query.gender
        //     filter.gender=gender
        // }
        // if (req.query.subject) {
        //     tuition = req.query.subject
        //     // console.log(tuition);

        //     // filter.tuitionSubjects.name = tuition

        // }
        // console.log(filter);



        const result = await studentServices.getAllByFilter(req.query)
        console.log(result);

        res.status(200).json({
            status: "success",
            found:result?.count,
            result:result?.result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}