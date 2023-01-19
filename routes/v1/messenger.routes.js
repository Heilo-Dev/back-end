const router = require("express").Router();
const messengerController = require("../../controller/messenger.controller")
const verifyToken = require('../../middleware/verifyToken');

router.post("/create-conversation", verifyToken, messengerController.createConversation)

router.get("/inbox",  messengerController.messages)

module.exports = router;