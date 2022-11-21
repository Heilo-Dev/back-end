const { userupdate } = require("../controller/user.controller");
const User = require("../model/User")

exports.getTecherFindByEmail = async (email) => {
    return result = await User.findOne({ email })

}

exports.updateATeacherServices = async (email, body) => {
    // console.log(email, body);
    const result = await User.updateOne({ email }, body);

    return result;
}