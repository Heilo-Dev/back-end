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

exports.adminWallateController = async (req, res, next) => {
    try {
     
        const result = await adminServices.adminWallateService()
 
    //    console.log(result);
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
exports.purchaseReqController = async (req, res, next) => {
    try {
     
        const updateData = await adminServices.purchaseReqService(req.body)
 
    //    console.log(result);
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