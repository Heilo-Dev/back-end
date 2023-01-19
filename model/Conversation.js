const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


const conversationSchema = mongoose.Schema({
    creator: {
        id: ObjectId,
        name:String,
        avatar:String,
        
    },
    participant: {
        id: ObjectId,
        name: String,
        avatar: String,
    }

}, {
    timestamps: true
});
const Conversartion = mongoose.model("Conversartion", conversationSchema);
module.exports = Conversartion;