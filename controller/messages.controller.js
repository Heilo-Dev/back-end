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


exports.getMessages = async (req, res, next) => {
    try {
        const { conversation_id }   = req.body
        console.log(conversation_id);
            const result = await Message.find({
            "conversation_id":conversation_id
        })
       
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(500).json({ messages:error })
    }
}