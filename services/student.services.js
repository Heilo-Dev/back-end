const User = require("../model/User");
const UserWallate = require("../model/UserWallate")




exports.onDemangetAllByFilter = async (filter) => {

  // console.log(filter);

  const result = await User.aggregate([{
    "$match": filter
  },]).project({ name: 1, "education.currentInstitution.name": 1, tuitionSubjects: 1, hourlyRate: 1, gender: 1 })

  const count = await User.aggregate([{
    "$match": filter
  }, {
    "$count": "found"
  }])

  return { result, count }


}


exports.getStudentFindByEmail = async (email) => {
  return result = await User.findOne({ email })

}

exports.updaterStudentProfile = async (email, data) => {

  return result = await User.updateOne({ email }, data)


}

exports.topUp_ReqService = async (data) => {
  const { trxId, _id, amount, operator } = data;


  const exits = await UserWallate.findById({ _id })

  const filter = exits.transaction.filter(obj => obj.trxId == trxId)
  // console.log(filter);

  if (filter.length) {
    return { status: "fail", message: "Already apply  this TransactionId 👎" }
  }

  const result = await UserWallate.updateOne({ _id }, { $push: { transaction: { trxId, amount, operator }, runValidators: true } },)
  // console.log(result);
  return result;
}

exports.getWallateService = async (user) => {
  const { email } = user
  const result = await UserWallate.find({ email: email, })

  return result
}