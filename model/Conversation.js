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
    timestaps: true
});
const Conversartion = mongoose.model("Conversartion", conversationSchema);