
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const validator = require('validator');


const sessionSchema = mongoose.Schema({
    upCommingSession: {
        teacher: {
            timeStamps: true,
            id: {
                type: ObjectId
            },
            topic: {
                type: String,
                trim: true,
                lowercase: true
            },

            student: {
                timeStamps: true,
                id: {
                    type: ObjectId
                },
                topic: {
                    type: String,
                    trim: true,
                    lowercase: true
                }
            }
        }
        
    },
    

})
const session = mongoose.model("session", sessionSchema)
module.exports = session;