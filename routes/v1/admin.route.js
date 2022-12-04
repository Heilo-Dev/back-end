const express = require('express');
const router = express.Router()
const adminController = require("../../controller/admin.controller");
const verifyToken = require('../../middleware/verifyToken');


router.get("/home",verifyToken, adminController.homeGet)


module.exports = router;