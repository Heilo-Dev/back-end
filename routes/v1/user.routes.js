const router = require("express").Router();

const userController = require("../../controller/user.controller");
const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");


//  http:domain:port/api/v1/user
router.get("/",verifyAdmin, userController.allUser);

router.post("/register",userController.register);
router.post("/login", userController.login);
router.get("/getme", verifyToken, userController.getme);

router.patch("/reset-password", userController.resetPassword);

router.patch("/reset-password", userController.resetPassword);
// router.patch("/update",verifyToken, userController.userupdate)

module.exports = router;
