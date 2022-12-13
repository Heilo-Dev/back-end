const User = require("../model/User")
const  userWallate = require("../model/UserWallate")

exports.homeGetService = async () => {
    const users = await User.find()
    
    let studentCount = 0
    let teacherCount = 0

    users.map(user => {
        if (user.role === "student") {
            studentCount += 1
        }
        if (user.role === "teacher") {
            teacherCount += 1
        }
    })
//    const teacherCount = await userModel.find({role:"teacher"}).count()
    return {  studentCount,teacherCount}
}
exports.adminWallateService = async () => {
    
    const result = await userWallate.find({ "transaction.status": "pending" })
    
    
    return  result 
}

exports.purchaseReqService = async (data) => {
    const { amount, _id, status } = data

    const updateAmount = await userWallate.findByIdAndUpdate({ "transaction._id": _id }, { $inc: {"transaction.amount": amount }})

    console.log(updateAmount);
    return updateAmount
}