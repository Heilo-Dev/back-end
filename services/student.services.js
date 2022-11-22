const User = require("../model/User");

exports.getAllByFilter = async (filter) => {
  console.log("services ",filter);

  // const count = await User.find().where("gender")?.equals(filter.gender)?.where("tuitionSubjects.name")?.equals(filter.subject)?.count()
  
  const result = await User.find().where("gender")?.equals(filter.gender)?.where("tuitionSubjects.name")?.equals(filter.subject)

  // .where("availability").equals(filter.availability)

/* 
    .equals({
      "tuitionSubjects.name": "Bangla"
    }).equals({ gender: "female" }) */
  return { count, result };
}