const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

const app = require("./app");

// database connetion
mongoose.connect(process.env.DATA_BASE_URI).then(() => {
    console.log("Database connected Succefully".white);
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Lisnting at port ${port}`.blue )
})