const userModel = require("../model/User")

exports.homeGetService = async () => {
    const studenCount = await userModel.find({ role: "student" }).count()
   const teacherCount = await userModel.find({role:"teacher"}).count()
   return {studenCount,teacherCount}
}