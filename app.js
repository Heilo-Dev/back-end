const express = require("express");
const app = express();
const cors = require("cors")
const teacherRouter = require("./routes/v1/teacher.route")
const userRoute = require("./routes/v1/user.route")
const studentRouter = require("./routes/v1/student.route")


// midlldeware
app.use(cors());
app.use(express.json())


app.get("/", async (req, res) => {
    res.status(200).send(
        "Server Working Successfully!! 😎"
    )
})

app.use("/api/v1/user", userRoute)
app.use("/api/v1/teacher", teacherRouter)
app.use("/api/v1/student", studentRouter)



app.use("/*", async (req, res) => {
    res.status(404).json({
        status: "fail",
        message:"No routes found"
    })
})

module.exports = app;