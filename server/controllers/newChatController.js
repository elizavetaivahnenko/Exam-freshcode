const {
  Conversation,
  Message,
  Catalog,
  User,
  CatalogToConversation,
  sequelize,
} = require("../models");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
const chatQueries = require("./queries/chatQueries");
const RightsError = require("../errors/RightsError");

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

//isChatBelongUser
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
    if (updateColumn === 1) {
      res.send(chat);
    } else {
      throw new RightsError();
    }
  } catch (err) {
    res.send(err);
  }
};

//ожидается правка на клиенте

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await chatQueries.getCatalogsQuery({
      userId: req.tokenData.userId,
    });
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

//isChatBelong
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
    if (updateColumn === 1) {
      res.send(chat);
      const interlocutorId = req.body.participants.filter(
        (participant) => participant !== req.tokenData.userId
      )[0];
      controller
        .getChatController()
        .emitChangeBlockStatus(interlocutorId, chat);
    } else {
      throw new RightsError();
    }
  } catch (err) {
    res.send(err);
  }
};

//2 middleware

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    await CatalogToConversation.create({
      catalogId: req.body.catalogId,
      conversationId: req.body.chatId,
    });
    const catalog = await chatQueries.getCatalog({
      id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const [updateColumn] = await Catalog.update(
      { catalogName: req.body.catalogName },
      {
        where: {
          id: req.body.catalogId,
          userId: req.tokenData.userId,
        },
      }
    );
    if (updateColumn === 1) {
      const catalog = await chatQueries.getCatalog({
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      });
      res.send(catalog);
    } else {
      throw new RightsError();
    }
  } catch (err) {
    next(err);
  }
};

//isChatBelongsUser
module.exports.createCatalog = async (req, res, next) => {
  try {
    const newCatalog = await Catalog.create(
      {
        userId: req.tokenData.userId,
        catalogName: req.body.catalogName,
      },
      { returning: ["id"] }
    );
    await CatalogToConversation.create({
      conversationId: req.body.chatId,
      catalogId: newCatalog.id,
    });
    const catalog = await chatQueries.getCatalog({
      id: newCatalog.id,
      userId: req.tokenData.userId,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    await CatalogToConversation.destroy({
      where: { catalogId: req.body.catalogId },
      transaction,
    });
    await Catalog.destroy({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      transaction,
    });
    await transaction.commit();
    res.end();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

//isChatBelongsToUser
module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    await CatalogToConversation.destroy({
      where: {
        catalogId: req.body.catalogId,
        conversationId: req.body.chatId,
      },
    });
    const catalog = await chatQueries.getCatalog({
      id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    res.next(catalog);
  } catch (err) {
    next(err);
  }
};
