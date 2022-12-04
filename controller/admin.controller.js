const adminServices = require("../services/admin.services");


exports.homeGet = async (req, res, next) => {
    try {
        console.log(req.user);
        if (req.user.role !== "admin") {
            return res.status(401).json({
                status: 'fail',
                message: "unauthorized"
            })
        }

        const result = await adminServices.homeGetService()
console.log( result);
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