const { Router } = require("express");

const basicMiddlewares = require("../middlewares/basicMiddlewares");
const contestController = require("../controllers/contestController");
const checkToken = require("../middlewares/checkToken");
const upload = require("../utils/fileUpload");

const usersRouter = Router();

usersRouter.get(
  "/downloadFile/:fileName",
  checkToken.checkToken,
  contestController.downloadFile
);
usersRouter.post(
  "/setNewOffer",
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);
usersRouter.post(
  "/setOfferStatus",
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);
usersRouter.post(
  "/changeMark",
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
usersRouter.post(
  "/updateUser",
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

usersRouter.post("/getUser", checkToken.checkAuth);

module.exports = usersRouter;
