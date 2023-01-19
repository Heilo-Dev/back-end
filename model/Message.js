const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


// Messaging Model
const messageSchema = mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    attachment: [
        {
            type: String,
            default: ""
        }
    ],
    sender: {
        id: { type: ObjectId, required: true },
        name: String,
        avatar: String
    },
    receiver: {
        id: { type: ObjectId, required: true },
        name: String,
        avatar: String
    },
    date_time: {
        type: Date,
        default: Date.now,
    },
    Conversartion_id: {
        type: ObjectId,
        required: true
    }

}, {
    timestaps: true
});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message
