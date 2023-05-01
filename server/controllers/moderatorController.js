const {
  Sequelize,
  sequelize,
  Contest,
  Rating,
  Select,
  Offer,
  User,
} = require("../models");
const ServerError = require("../errors/ServerError");
const contestQueries = require("./queries/contestQueries");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
const UtilFunctions = require("../utils/functions");
const CONSTANTS = require("../constants");

module.exports.getModeratorOffers = async (req, res, next) => {
  console.log(req.headers);
  try {
    const { count: totalOffers, rows: offers } = await Offer.findAndCountAll({
      where: { moderationStatus: req.headers.moderstatus },
      attributes: [
        "id",
        "userId",
        "text",
        "fileName",
        "originalFileName",
        "moderationStatus",
      ],
      limit: req.headers.limit,
      offset: req.headers.offset ? req.headers.offset : 0,
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          required: false,
          attributes: ["email", "displayName"],
        },
      ],
    });
    res.status(200).send({ totalOffers, offers });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.newModerationStatusOffer = async (req, res, next) => {
  try {
    const [rowsUpdated] = await Offer.update(
      { moderationStatus: req.body.moderStatus },
      {
        where: {
          id: req.body.offerId,
        },
      }
    );
    if (rowsUpdated === 0) {
      const error = new Error(`Offer with ID ${req.body.offerId} not found.`);
      error.statusCode = 404;
      throw error;
    }
    res.status(201).send("Moderation status updated successfully.");
  } catch (err) {
    next(err);
  }
};
