const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
    try {

        const token = req.headers?.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "you are not logged in! "
            })
        }
        const decodedToken = await jwt.verify(token, process.env.ACCESS_SECRECT_TOKEN);

        // console.log("decoded ",decodedToken);
        req.user = await User.findOne({ email: decodedToken.email })
        // console.log(user.toObject())
        // await console.log(decodedToken)
        next()

    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "invalid token"
        })
    }
}