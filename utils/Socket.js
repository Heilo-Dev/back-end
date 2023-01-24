const express = require("express");
const http = require("http");

const { Server } = require("socket.io");
const app = express();
const httpServer = http.createServer(app)
const Conversation = require("../model/Conversation")


const io =  Server(
    httpServer, {
    cors: {
        origin: process.env.HOST_NAME,
        methods: ["GET", "POST"]
    }
}
);


    io.on("connection", function (socket) {
        // console.log("new user connected", socket.id);


    socket.on("send_message", async (data) => {
            try {
                console.log(data);
                const { Conversartion_id, sender, receiver, text, date_time } = data;
                if (typeof data != "object") {
                    console.log(typeof data);
                    let error = { status: 500, message: "Please send valid json object" }
                    return io.emit("error", error)
                }
                if (!Conversartion_id && sender && receiver) {
                    error = { status: 400, message: "require: conversationId*, sender*, receiver*" }
                    return io.emit("error", error)

                }
                const findConversation = await Conversation.findById({ "_id": Conversartion_id })

                if (!findConversation) {
                    error = { status: 404, message: "This conversation or user not found" }
                    return io.emit("error", error)
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
                io.emit("error", error)
                console.log(error);
            }

        })

    })
module.exports = httpServer