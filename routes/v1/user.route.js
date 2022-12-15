const router = require("express").Router();
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middleware/verifyToken");



router.route("/register").post(userController.register);
router.post("/login", userController.login);
router.get("/getme", verifyToken, userController.getme);
<<<<<<< HEAD
router.patch("/reset-password",  userController.resetPassword);

=======
router.patch("/reset-password", userController.resetPassword);
// router.patch("/update",verifyToken, userController.userupdate)
>>>>>>> cb71c3a6d44c874c4cf93d759f6414415c710149

module.exports = router;
