
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const reqTransactionSchema = mongoose.Schema({

    _id: {
        type: ObjectId,
        ref: "User"

    },
    email: {
        uniqe: true,
        type: String,
        required: true,

    },
    transaction: [{
        trxId: {
            uniqe:true,
            type: String,
            required: true,
            message:"transactionID is not valid"
        },
        amount: {
            type: Number,
            min:10,
            required: true,

        },
        status: {
            type: String,
            enum: ["not-paid", "verified", "pending"],
            default: "pending"
        }
    }]


})

const ReqTransaction = mongoose.model("ReqTransaction", reqTransactionSchema)
module.exports = ReqTransaction;