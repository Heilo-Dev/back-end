const express = require("express");
const router = express.Router();
const controller = require("../../controller/techer.controller");


router.route("/")
    .get(controller.getTecherByEmailController)
    .post(controller.createATeacherController)
    .put(controller.updateATeacherController)



module.exports = router;