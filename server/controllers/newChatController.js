const { Conversation, Message, Catalog, User } = require("../models");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await Message.findAll({
      attributes: [
        "id",
        "sender",
        "body",
        "conversation",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Conversation,
          where: {
            participant_1: participants[0],
            participant_2: participants[1],
          },
          attributes: [],
          require: true,
        },
      ],
    });
    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const predicate =
    "favoriteList_" + (req.body.participants.indexOf(req.tokenData.userId) + 1);
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const [updateColumn, chat] = await Conversation.update(
      {
        [predicate]: req.body.favoriteFlag,
      },
      {
        where: {
          participant_1: participants[0],
          participant_2: participants[1],
        },
        returning: true,
        plain: true,
      }
    );
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await Catalog.destroy({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

//ожидается правка на клиенте

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.findAll({
      where: {
        userId: req.tokenData.userId,
      },
      attributes: ["id", "catalogName"],
      include: [
        {
          model: Conversation,
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });
    const modifiedCatalogs = catalogs.map((catalog) => ({
      id: catalog.id,
      catalogName: catalog.catalogName,
      chats: catalog.Conversations.map((conversation) => conversation.id),
    }));
    res.send(modifiedCatalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const predicate =
    "blackList_" + (req.body.participants.indexOf(req.tokenData.userId) + 1);
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const [updateColumn, chat] = await Conversation.update(
      {
        [predicate]: req.body.blackListFlag,
      },
      {
        where: {
          participant_1: participants[0],
          participant_2: participants[1],
        },
        returning: true,
        plain: true,
      }
    );
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};
