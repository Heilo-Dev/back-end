
const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const transactionSchema = mongoose.Schema({
    trxId: {
        type: String,
        required:true
    },
    id: {
        type: ObjectId,
        ref:"User"
        
    }
})