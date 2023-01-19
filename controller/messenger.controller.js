const Conversartion = require("../model/Conversation")
const Message = require("../model/Message")

const express = require("express");
const app = express();


exports.createConversation = async (req, res) => {
    try {
        // console.log(req.user);
        const { _id, name } = req.user;
        const { id, name: participantName } = req.body.participant;

        // console.log("creator :", _id, name, "paricipant :", id, participantName);
        let existing_conversation = await Conversartion.find({
            $and: [{ "creator.id": _id }, { "participant.id": id }]
        })

        if (existing_conversation.length <= 0) {

            // console.log(existing_conversation);
            existing_conversation = await Conversartion.create({
                "creator.id": _id, "creator.name": name, "participant.id": id, "participant.name": participantName
            })
        }
        // console.log(existing_conversation);
        res.status(200)
            .json({
                status: "successful",
                message: "Conversation connected"

            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}


exports.messages = async (req, res, next) => {
    try {
        const { _id, name } = req.user
        const { Conversartion_id, receiver, text, attachment } = req.body
        const { id, name: receiver_name } = receiver


        io.on("connection", function (socket) {
            console.log("new user connected", socket.id);
            // console.log(ioEvent.on);
            socket.on("message", function (message_text) {
                io.emit("messageForward", message_text)
                
            })
            socket.on("disconnect", function () {
                console.log('user disconnected', socket.id);
            })
        })
        
        const result = await Message.create({
            text,
            attachment,
            Conversartion_id,
            "sender.id":_id,
            "sender.name":name,
            "receiver.id": id,
            "receiver.name": name
        })
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}