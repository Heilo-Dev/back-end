const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const QuizSchema = mongoose.Schema({

})


const Quiz = mongoose.model("Quiz", QuizSchema)
module.exports = Quiz;
