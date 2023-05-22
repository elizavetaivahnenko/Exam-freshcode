const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const chatController = require("../controllers/newChatController");
const chatMiddleware = require("../middlewares/chatMiddlewares");

const chatRouter2 = Router();

// chatRouter2.post("/test", checkToken.checkToken, chatController.getPreview);

chatRouter2.post(
  "/newMessage",
  checkToken.checkToken,
  chatController.addMessage
);

chatRouter2.post("/getChat", checkToken.checkToken, chatController.getChat);

chatRouter2.post(
  "/getPreview",
  checkToken.checkToken,
  chatController.getPreview
);

chatRouter2.post(
  "/blackList",
  checkToken.checkToken,
  chatMiddleware.isChatBelongUserForFavoriteAndBlackList,
  chatController.blackList
);

chatRouter2.post(
  "/favorite",
  checkToken.checkToken,
  chatMiddleware.isChatBelongUserForFavoriteAndBlackList,
  chatController.favoriteChat
);

chatRouter2.post(
  "/createCatalog",
  checkToken.checkToken,
  chatMiddleware.isChatBelongUser,
  chatController.createCatalog
);

chatRouter2.post(
  "/updateNameCatalog",
  checkToken.checkToken,
  chatController.updateNameCatalog
);

chatRouter2.post(
  "/addNewChatToCatalog",
  checkToken.checkToken,
  chatMiddleware.isChatBelongUser,
  chatMiddleware.isCatalogBelongUser,
  chatController.addNewChatToCatalog
);

chatRouter2.post(
  "/removeChatFromCatalog",
  checkToken.checkToken,
  chatMiddleware.isChatBelongUser,
  chatController.removeChatFromCatalog
);

chatRouter2.post(
  "/deleteCatalog",
  checkToken.checkToken,
  chatController.deleteCatalog
);

chatRouter2.post(
  "/getCatalogs",
  checkToken.checkToken,
  chatController.getCatalogs
);

module.exports = chatRouter2;
