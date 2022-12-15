const router = require("express").Router();
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middleware/verifyToken");



router.route("/register").post(userController.register);
router.post("/login", userController.login);
router.get("/getme", verifyToken, userController.getme);
router.patch("/reset-password",  userController.resetPassword);


module.exports = router;
