const { Router } = require("express");

const basicMiddlewares = require("../middlewares/basicMiddlewares");
const moderatorController = require("../controllers/moderatorController");
const checkToken = require("../middlewares/checkToken");

const moderatorRouter = Router();

moderatorRouter.get(
  "/getModeratorOffers",
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  moderatorController.getModeratorOffers
);

moderatorRouter.post(
  "/newModerationStatusOffer",
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  moderatorController.newModerationStatusOffer
);

module.exports = moderatorRouter;
