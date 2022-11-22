const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please provide your valid email"],
        validate: [validator.isEmail, "please Provide valid email"]

    },
    password: {
        type: String,
        require: [true],
        validate: {
            validator: (value) => {

                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1
                })
            },
            message: "{VALUE} is not Strong for Password"
        }
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Please provide your phone number"],
        validate: [validator.isMobilePhone],
        message: "{VALUE} is not valid number"
    },
    education: {
        currentInstitution: {
            name: String,
            department: String,
            session: String
        },
        previousInstitution: {
            name: String,
            department: String,

        }
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["student", "teacher", "admin"],
            message: "{VALUE} is not student or teacher"
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "inactive"
    },

    gender: {
        type: String,
        enum: ["male", "female", "transgender", ''],

    },

    /**
     * TEACHER iNFORMATION
     */
    hourlyRate: {
        type: Number,
        min: 0

    },
    tuitionSubjects: [{
        name: {
            type: String,
            trim: true,
            lowercase:true
        },
        class: {
            type: String
        }
    }],
    division: {
        type: String,
        lowercase: true,
        trim: true
    },
    village: {
        type: String,
        trim: true
    },
    preferredMedium: [{
        type: String,

    }],
    availability: [
        {
            type: String,
            lowercase:true
        }
       
    ],
    /* preferredClass: [{
        type: String
    }] */
    rating: {
        type:Number
    }

},
    {
    timestamps: true
})

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;


    next()
})

userSchema.methods.comparePassword = function (password) {

    const isPasswordValid = bcrypt.compareSync(password, this.password)
    console.log(this.password);
    return isPasswordValid
}

const User = mongoose.model("User", userSchema)
module.exports = User;