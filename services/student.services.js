const User = require("../model/User");

exports.getAllByFilter = async (filter) => {

  // console.log(filter);

  const result = await User.aggregate([{
    "$match": filter
  },]).project({ name: 1, "education.currentInstitution.name": 1, tuitionSubjects: 1, hourlyRate :1,gender:1})

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
  const { trxId, amount } = data.transaction
  const exits = await reqTrxModel.findById({ _id: data._id })


  if (!exits) {
    let result = await reqTrxModel.create(data)
    return result
  }

  const filter = exits.transaction.filter(obj => obj.trxId == trxId)


  if (!filter.length) {
    const result = await reqTrxModel.updateOne({ _id: data._id },
      { $push: { transaction: { trxId, amount } } })
    return result
  }
  else {
    return result = ("invalid TrxID")
  }


}