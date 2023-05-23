const {
  Conversation,
  Message,
  Catalog,
  User,
  CatalogToConversation,
  sequelize,
  Sequelize,
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
      }
    );
    if (updateColumn === 1) {
      const result = await chatQueries.getConversation({
        participant_1: participants[0],
        participant_2: participants[1],
      });
      res.send(result);
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
      }
    );
    if (updateColumn === 1) {
      const result = await chatQueries.getConversation({
        participant_1: participants[0],
        participant_2: participants[1],
      });
      res.send(result);
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
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Sequelize.Op.or]: [
          { participant_1: req.tokenData.userId },
          { participant_2: req.tokenData.userId },
        ],
      },
      attributes: [
        "favoriteList_1",
        "favoriteList_2",
        "blackList_1",
        "blackList_2",
        "participant_1",
        "participant_2",
      ],
      include: [
        {
          model: Message,
          attributes: ["id", "sender", ["body", "text"], "createdAt"],
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
          where: {
            [Sequelize.Op.or]: [
              {
                id: {
                  [Sequelize.Op.eq]: Sequelize.col(
                    "Conversation.participant_1"
                  ),
                },
              },
              {
                id: {
                  [Sequelize.Op.eq]: Sequelize.col(
                    "Conversation.participant_2"
                  ),
                },
              },
            ],
            [Sequelize.Op.not]: { id: req.tokenData.userId },
          },
        },
      ],
    });
    const modifiedConversations = conversations.map((conversation) => {
      const message = conversation?.Messages?.[0]?.dataValues || {};
      return {
        id: message.id,
        sender: message.sender,
        text: message.text,
        createAt: message.createdAt,
        participants: [conversation.participant_1, conversation.participant_2],
        blackList: [conversation.blackList_1, conversation.blackList_2],
        favoriteList: [
          conversation.favoriteList_1,
          conversation.favoriteList_2,
        ],
        interlocutor: conversation.User,
      };
    });
    res.send(modifiedConversations);
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const [user1, user2] = participants;
  try {
    const [newConversation] = await Conversation.findOrCreate({
      where: {
        participant_1: user1,
        participant_2: user2,
      },
      defaults: {
        blackList_1: false,
        blackList_2: false,
        favoriteList_1: false,
        favoriteList_2: false,
      },
      transaction,
    });
    const getMessage = await Message.create(
      {
        sender: req.tokenData.userId,
        body: req.body.messageBody,
        conversation: newConversation.id,
      },
      { transaction }
    );
    await transaction.commit();
    getMessage.dataValues.participant_1 = user1;
    getMessage.dataValues.participant_2 = user2;
    const [interlocutorId] = participants.filter(
      (participant) => participant !== req.tokenData.userId
    );
    const message = {
      createdAt: getMessage.createdAt,
      updatedAt: getMessage.updatedAt,
      id: getMessage.id,
      sender: getMessage.sender,
      body: getMessage.body,
      conversation: getMessage.conversation,
      participants: [getMessage.participant_1, getMessage.participant_2],
    };
    const preview = {
      id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: getMessage.createdAt,
      participants: [user1, user2],
      blackList: [newConversation.blackList_1, newConversation.blackList_2],
      favoriteList: [
        newConversation.favoriteList_1,
        newConversation.favoriteList_2,
      ],
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      getMessage,
      preview: {
        ...preview,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
