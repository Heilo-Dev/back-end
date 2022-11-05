const Teacher = require("../model/techerSchema");

exports.getTecherByEmailService = async (email) => {
    const result = await Teacher.find({ email }, {})
    console.log(result)
    return result;


}
exports.createATecherService = async (body) => {
    const result = await Teacher.create(body);
    return result;
}
exports.updateATeacherServices = async (email, body) => {
    // console.log(email, body);
    const result = await Teacher.updateOne({ email }, { $set: body }, { new: true });
    
    return result;
}