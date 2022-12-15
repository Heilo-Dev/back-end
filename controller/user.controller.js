const Services = require("../services/user.services")
const { generateToken } = require("../utils/generateToken")
const {findUserByEmail, userupdate,getAllUserService} = require("../services/user.services")


//all user
exports.allUser = async (req,res)=>{
    try{
        const fields = req.query.fields;
        const getAllUser = await getAllUserService(fields);
        res.status(200).json({
            status: "success",
            data: getAllUser,
        });
    }catch (error) {
        res.status(404).json({
            status: "Data find to Failed",
            error: error.message,
        });
    }
}


//register user
exports.register = async (req, res, next) => {
    try {
        const result = await Services.singup(req.body)
        const user = await Services.findUserByEmail(result.email)
        console.log(user);
        // const wallate = await Services.createWallate(user.email, user._id)
        res.status(200).json({
            status: "success",
            message: "successfully sign up "
        });

    } catch (error) {

        res.status(500).json({
            status: "fail",
            error: error.message
        })

    }
}

//login user
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!(email || !password)) {
            return res.status(401).json({
                status: "fail",
                error: "please provide email and password"
            })
        }
        const user = await Services.findUserByEmail(email)
        // console.log(user);
        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: "no user found , Please create a new account"
            })
        }


        const isValidPassword = user.comparePassword(password)
        // console.log(isValidPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                status: "fail",
                error: "wrong password"
            })
        }

        // if (user.status !== "active") {
        //     return res.status(403).json({
        //         status: "fail",
        //         error: `This accounts is ${user.status}`
        //     })
        // }
        const token = generateToken(user);
        // console.log(user);
        const { password: pass, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Succesfully log in",
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",

        })
    }
}

//reset password
exports.resetPassword = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const findEmail =await findUserByEmail(email);
        if(findEmail){
            const updateThePassword = await userupdate(password);
            res.status(200).json({
                status: "success",
                "message":"password update successful",
                result: updateThePassword
            });
        }
    }catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}

//refresh token
exports.getme = async (req, res, next) => {
    try {
        const result = await Services.findUserByEmail(req.user?.email)
        const { password, ...others } = result.toObject()
        res.status(200).json({
            status: "success",
            result: others
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })

    }
}

