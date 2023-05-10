const { Contest, Offer, User } = require("../../models");
const ServerError = require("../../errors/ServerError");

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError("cannot update Contest");
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updateResult[0] < 1) {
    throw new ServerError("cannot update Contest");
  } else {
    return updateResult[1][0].dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError("cannot update offer!");
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (result[0] < 1) {
    throw new ServerError("cannot update offer!");
  } else {
    return result[1];
  }
};

module.exports.createOffer = async (data) => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError("cannot create new Offer");
  } else {
    return result.get({ plain: true });
  }
};

module.exports.getDataForMail = async (offerId) => {
  try {
    let mailData = await Offer.findOne({
      where: { id: offerId },
      attributes: ["moderationStatus"],
      include: [
        {
          model: User,
          required: false,
          attributes: ["email", "firstName"],
        },
      ],
    });
    return mailData;
  } catch (err) {
    console.log(err);
  }
};
