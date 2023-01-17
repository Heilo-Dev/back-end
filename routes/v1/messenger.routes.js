const router = require("express").Router();
const messengerController = require("../../controller/messenger.controller")
router.post("/message", messengerController.getMessage)

module.exports = router;