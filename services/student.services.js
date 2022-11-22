const User = require("../model/User");

exports.getAllByFilter = async (filter) => {
  console.log("services ", filter);



  if (filter.gender && !filter.subject) {
    const result = await User.find({ gender: filter.gender })
    const count = await User.find({ gender: filter.gender }).count()
    return { result, count }

  }

  if (filter.gender && filter.subject) {
    const result = await User.find({ gender: filter.gender, $in: { tuitionSubjects: filter.subject } })
    const count = await User.find({ gender: filter.gender, $in: { tuitionSubjects: filter.subject } }).count()
 
    return { result, count }

  }
  if (!filter.gender && filter.subject) {
    const result = await User.find({ "tuitionSubjects.name": filter.subject})
    const count = await User.find({ "tuitionSubjects.name": filter.subject}).count()
    
 
    return { result, count }

  }
  
}