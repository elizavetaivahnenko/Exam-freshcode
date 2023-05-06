const { Offer, User } = require("../models");
const ServerError = require("../errors/ServerError");
const sendStatusOfferOnEmail = require("../utils/sendStatusOfferOnEmail");

module.exports.getModeratorOffers = async (req, res, next) => {
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
    const mailData = await Offer.findOne({
      where: { id: req.body.offerId },
      attributes: ["text", "status"],
      include: [
        {
          model: User,
          required: false,
          attributes: ["email", "displayName"],
        },
      ],
    });
    sendStatusOfferOnEmail(mailData);
    res.status(201).send("Moderation status updated successfully.");
  } catch (err) {
    next(err);
  }
};
