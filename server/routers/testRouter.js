// const { Router } = require("express");
// const checkToken = require("../middlewares/checkToken");
// const chatController = require("../controllers/newChatController");
// const chatMiddleware = require("../middlewares/chatMiddlewares");

// const chatRouter2 = Router();

// chatRouter.post(
//   "/newMessage",
//   checkToken.checkToken,
//   chatController.addMessage
// );

// chatRouter.post("/getChat", checkToken.checkToken, chatController.getChat);

// chatRouter.post(
//   "/getPreview",
//   checkToken.checkToken,
//   chatController.getPreview
// );

// chatRouter.post(
//   "/blackList",
//   checkToken.checkToken,
//   chatMiddleware.isChatBelongUserForFavoriteAndBlackList,
//   chatController.blackList
// );

// chatRouter.post(
//   "/favorite",
//   checkToken.checkToken,
//   chatMiddleware.isChatBelongUserForFavoriteAndBlackList,
//   chatController.favoriteChat
// );

// chatRouter.post(
//   "/createCatalog",
//   checkToken.checkToken,
//   chatMiddleware.isChatBelongUser,
//   chatController.createCatalog
// );

// chatRouter.post(
//   "/updateNameCatalog",
//   checkToken.checkToken,
//   chatController.updateNameCatalog
// );

// chatRouter.post(
//   "/addNewChatToCatalog",
//   checkToken.checkToken,
//   chatMiddleware.isChatBelongUser,
//   chatMiddleware.isCatalogBelongUser,
//   chatController.addNewChatToCatalog
// );

// chatRouter.post(
//   "/removeChatFromCatalog",
//   checkToken.checkToken,
//   chatMiddleware.isChatBelongUser,
//   chatController.removeChatFromCatalog
// );

// chatRouter.post(
//   "/deleteCatalog",
//   checkToken.checkToken,
//   chatController.deleteCatalog
// );

// chatRouter.post(
//   "/getCatalogs",
//   checkToken.checkToken,
//   chatController.getCatalogs
// );

// module.exports = chatRouter2;
