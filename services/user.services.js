
const User = require("../model/User")
const UserWallate = require("../model/userWallate")
const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaType.ObjectId



exports.singup = async (data) => {
    const result = await User.create(data) 
    let id =result._id.toString()
    const wallate = await UserWallate.create({ _id:result.id, email: result.email, role:result.role})
    
    return result;
}
// exports.createWallate = async (data) => {
//     const wallate = await UserWallate.create(data)
//     return wallate
// }




exports.findUserByEmail = async (email) => {
    let result = await User.findOne({ email })
    return result;
}
// exports.findUserById = async (id) => {
//     let result = await User.findOne({ id })
//     return result;
// }
exports.userupdate = async (data) => {
    let result = await User.updateOne(data)
    return result;
}