const { Router } = require("express");
const basicMiddlewares = require("../middlewares/basicMiddlewares");
const checkToken = require("../middlewares/checkToken");
const upload = require("../utils/fileUpload");
const validators = require("../middlewares/validators");
const payController = require("../controllers/payController");

const payRouter = Router();

payRouter.post(
  "/pay",
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  payController.payment
);

payRouter.post(
  "/cashout",
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  payController.cashout
);

module.exports = payRouter;
