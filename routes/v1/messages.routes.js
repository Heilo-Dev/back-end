const router = require("express").Router();
const messengerController = require("../../controller/messages.controller")
const verifyToken = require('../../middleware/verifyToken');

//https:domain:port/api/v1/messages
router.post("/create-conversation", verifyToken, messengerController.createConversation)

router.get("/getMessages", verifyToken, messengerController.getMessages)

module.exports = router;