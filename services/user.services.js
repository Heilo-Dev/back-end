const User = require("../model/User")


exports.singup = async (data) => {
    return result = await User.create(data) 
}




exports.findUserByEmail = async (email) => {
    let result = await User.findOne({ email })
    return result;
}