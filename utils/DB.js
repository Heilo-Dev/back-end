const mongoose = require("mongoose");

module.exports = database = () => {
    mongoose
        .connect(process.env.DATA_BASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Database Connected.."))
        .catch("Connect to fail....");
};