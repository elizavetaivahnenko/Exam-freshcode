const { Sequelize, Catalog, Conversation } = require("../models");
const NotFound = require("../errors/UserNotFoundError");
const ServerError = require("../errors/ServerError");

module.exports.isCatalogBelongUser = async (req, res, next) => {
  try {
    const result = await Catalog.findOne({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      attributes: ["id"],
    });
    if (result) {
      next();
    } else {
      throw new NotFound("This catalog does not belong to this user");
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.isChatBelongUser = async (req, res, next) => {
  try {
    const result = await Conversation.findOne({
      where: {
        id: req.body.chatId,
        [Sequelize.Op.or]: [
          { participant_1: req.tokenData.userId },
          { participant_2: req.tokenData.userId },
        ],
      },
      attributes: ["id"],
    });
    if (result) {
      next();
    } else {
      throw new NotFound("This chat does not belong to this user");
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.isChatBelongUserForFavoriteAndBlackList = async (
  req,
  res,
  next
) => {
  try {
    const result = req.body.participants.includes(req.tokenData.userId);
    if (result) {
      next();
    } else {
      throw new NotFound("This chat does not belong to this user");
    }
  } catch (e) {
    next(new ServerError());
  }
};
