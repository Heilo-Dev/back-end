const app = require("../app")
const httpServer = require("http").Server(app);

const {Server} = require("socket.io");

const Conversation = require("../model/Conversation")

const Message = require("../model/Message")

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
 }
);


    io.on("connection", function (socket) {
        // console.log("new user connected", socket.id);


    socket.on("send_message", async (data) => {
            try {
                console.log(data);
                const { conversation_id, sender, receiver, text,attachment,  } = data;
                if (typeof data != "object") {
                    // console.log(typeof data);
                    let error = { status: 500, message: "Please send valid json object" }
                    return io.emit("error", error)
                }
                if (!conversation_id || !sender || !receiver) {
                    error = { status: 400, message: "require: conversationId*, sender*, receiver*" }
                    return io.emit("error", error)

                }
                const findConversation = await Conversation.findById({ "_id": conversation_id })

                if (!findConversation) {
                    error = { status: 404, message: "This conversation or user not found" }
                    return io.emit("error", error)
                }
                const saveMsg = await Message.create({
                    "conversation_id": findConversation._id,
                    "sender.id":sender.id,
                    "sender.name":sender.name,
                    "receiver.id":receiver.id,
                    "receiver.name":receiver.name,
                    text,
                    attachment,
                   
                })
                // console.log(saveMsg);
                io.emit("recived_message", saveMsg.text)
            } catch (error) {
                io.emit("error", error)
                console.log(error);
            }

        })

    })
module.exports = httpServer