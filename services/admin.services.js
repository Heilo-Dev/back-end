const userModel = require("../model/User")

exports.homeGetService = async () => {
    const users = await userModel.find()
    
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