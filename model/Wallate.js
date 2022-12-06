const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


const wallateSchema = mongoose.Schema({
    totalBalance: {
        type: Number, 
        timestamps:true
    },
    due: {
        id:{type:ObjectId},
        type: Number,
        timestamps:true        
    },
    paid: {
        id:{type:ObjectId},
        type: Number,
        timestamps:true
    }
})

const Wallate = mongoose.model("Wallate", wallateSchema)
module.exports = Wallate;