const express = require("express");
const app = express();
const cors = require("cors")
const router = require("./routes/v1/teacher.routes")



// midlldeware
app.use(cors());
app.use(express.json())

app.use("/api/v1/teacher", router)
app.use("/", async (req, res) => {
    res.status(200).send(
        "Server working succefully"
    )
})


module.exports = app;