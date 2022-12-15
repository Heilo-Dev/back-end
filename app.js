const express = require("express");
const app = express();
const cors = require("cors")
const teacherRouter = require("./routes/v1/teacher.route")
const userRoute = require("./routes/v1/user.route")
const studentRouter = require("./routes/v1/student.route")
const adminRoute = require('./routes/v1/admin.route')


// midlldeware
app.use(cors());
app.use(express.json())


app.get("/", async (req, res) => {
    res.status(200).send(
        "Server Working Successfully!! 😎"
    )
})


/**
 * USER 👇👇
 * login, register, get me..
 */
app.use("/api/v1/user", userRoute);
/*  */

/**TEACHER 👇👇
 * update,
 * sent witddraw request
 *  */
app.use("/api/v1/teacher", teacherRouter)
/*  */

/**STUDENT 👇👇
 * on deman Search
 * update
 * top-up
 * sent tuition request
 */
app.use("/api/v1/student", studentRouter)

/*  */


/**
 * ADMIN 👇👇
 * home Dashboard 
 */
app.use("/api/v1/admin", adminRoute)



// app.use("/*", async (req, res) => {
//     console.log(req);
//     res.status(404).json({
//         status: "fail",
//         message:"No routes found"
//     })
// })

module.exports = app;