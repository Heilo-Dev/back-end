const express = require("express");
const app = express();
const cors = require("cors");
const teacherRouter = require("./routes/v1/teacher.routes");
const userRoute = require("./routes/v1/user.routes");
const studentRouter = require("./routes/v1/student.routes");
const adminRoute = require("./routes/v1/admin.routes");
const sessionRoutes = require("./routes/v1/session.routes");
const review_rating = require("./routes/v1/review_rating.routes");
const messageRoute = require("./routes/v1/messenger.routes")
// midlldeware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Server Working Successfully!! 😎");
});

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
app.use("/api/v1/teacher", teacherRouter);
/*  */

/**STUDENT 👇👇
 * on deman Search
 * update
 * top-up
 * sent tuition request
 */
app.use("/api/v1/student", studentRouter);

/*  */

/**
 * ADMIN 👇👇
 * home Dashboard
 */
app.use("/api/v1/admin", adminRoute);

/**
 * session routes
 */
app.use("/api/v1/session", sessionRoutes);

/**
 * review ratings routes
 */
app.use("/api/v1/review-rating", review_rating);

/**
 * Messagin routes below
 */
app.use("/api/v1/inbox", messageRoute);
module.exports = app;
