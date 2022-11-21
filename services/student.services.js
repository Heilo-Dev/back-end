const User = require("../model/User");

exports.getAllByFilter = async (filter) => {
  console.log("services ",filter);

    const result = await User.find(filter).exec()/* .limit("10")  */
    return result;
}