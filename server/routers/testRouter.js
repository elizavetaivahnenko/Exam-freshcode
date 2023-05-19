const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const chatController = require("../controllers/newChatController");

const testRouter = Router();

testRouter.post("/test", checkToken.checkToken, chatController.getPreview);

module.exports = testRouter;
