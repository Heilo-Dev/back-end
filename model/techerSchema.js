const mongoose = require('mongoose');
const validator = require('validator');

const TeacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
        trim: true
    },
    email: {
        type: String,
        unique:true,
        lowercase: true,
        required: [true, "Please provide your valid email"],
        validate: [validator.isEmail, "please Provide valid email"]

    },
    contactNumber: {
        type: String,
    },
    hourlyRate: {
        type: Number,
        

    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ["male", "female"],

            message: "this {VALUE} isn't acceptable,Please provide male / female "
        },
    },
    division: {
        type: String,
        lowercase: true,
        trim: true
    },
    village: {
        type: String,
        trim: true
    },
    preferredMedium: {
        type: String,
    },
    preferredClass: {
        type: String
    },
    currentInstituite: {
        type: String,
        minLength: [5, "Institute name is too short"]
    },
    previousInstituite: {
        type: String,
        minLength: [5, "Institute name is too short"]
    },
    depertment: {
        type: String,

    }

})
const Teacher = mongoose.model("Teacher", TeacherSchema)
module.exports = Teacher;