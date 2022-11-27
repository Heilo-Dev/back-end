const User = require("../model/user");

exports.getAllByFilter = async (filter) => {
  
  if (filter.gender && !filter.subject) {
    const result = await User.find({ gender: filter.gender })
    const count = await User.find({ gender: filter.gender }).count()
    return { result, count }

  }

  if (filter.gender && filter.subject ) {
    const result = await User.find({ gender: filter.gender, $in: { tuitionSubjects: filter.subject } })
    const count = await User.find({ gender: filter.gender, $in: { tuitionSubjects: filter.subject } }).count()
 
    return { result, count }

  }
  if (!filter.gender && filter.subject ) {
    const result = await User.find({ "tuitionSubjects.name": filter.subject})
    const count = await User.find({ "tuitionSubjects.name": filter.subject}).count()
    
 
    return { result, count }

  }
  
}


exports.getStudentFindByEmail = async (email) => {
  return result = await User.findOne({ email })

}

exports.updaterStudentProfile = async (email,data) => {

  return result = await User.updateOne({ email }, data)
  
  
}