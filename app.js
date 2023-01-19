const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const Conversation = require("./model/Conversation")
const Message = require("./model/Message")


// imports Routes
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
  res.status(200).send("Server is yo yo Rocking !! 😎");
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


//  *ADMIN 👇👇
//  * home Dashboard
app.use("/api/v1/admin", adminRoute);

// session routes
app.use("/api/v1/session", sessionRoutes);

// review ratings routes
app.use("/api/v1/review-rating", review_rating);


//  Messaging routes below

app.use("/api/v1/req", messageRoute);
app.use("/api/v1/message", messageRoute);

// ---------------------------------------------------------------
// -----------------------  SOCKET IO    --------------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.HOST_NAME,
    methods: ["GET", "POST"]
  }
});

io.on("connection", function (socket) {
  // console.log("new user connected", socket.id);


  socket.on("send_message",async (data) => {
    try {
      console.log(data);
      const { Conversartion_id, sender, receiver, text, date_time } = data;
      if (!Conversartion_id && sender && receiver) {
        return console.log("empty");
      }
      const findConversation = await Conversation.findById({ "_id": Conversartion_id })

      if (!findConversation) {
        return
      }
      const saveMsg = await Message.create({
        "Conversartion_id": findConversation._id,
        sender,
        receiver,
        text,
        date_time
      })
      console.log(saveMsg);
    io.emit("recived_message", saveMsg.text)
    } catch (error) {

      console.log(error);
    }

  })

})

module.exports = server;
