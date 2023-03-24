const mongoose = require("mongoose");
require("colors");
const text = new Date();
mongoose.set("strictQuery", true);
module.exports = database = () => {
  mongoose
    .connect(process.env.LOCAL_DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(
        "Database Connected successfull",
        text.toLocaleString().bgGreen.black
      )
    )
    .catch("Connect to fail....");
};
