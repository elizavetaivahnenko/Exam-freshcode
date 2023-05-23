const { Catalog, Conversation } = require("../../models");
module.exports.getCatalog = async (predicate) => {
  const catalog = await Catalog.findOne({
    where: predicate,
    attributes: ["id", "catalogName", "userId"],
    include: [
      {
        model: Conversation,
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  });
  const modifiedCatalog = {
    id: catalog.id,
    userId: catalog.userId,
    catalogName: catalog.catalogName,
    chats: catalog.Conversations.map((conversation) => conversation.id),
  };
  return modifiedCatalog;
};

module.exports.getConversation = async (predicate) => {
  const getConversation = await Conversation.findOne({
    where: predicate,
    attributes: [
      "id",
      "participant_1",
      "participant_2",
      "blackList_1",
      "blackList_2",
      "favoriteList_1",
      "favoriteList_2",
      "createdAt",
      "updatedAt",
    ],
  });
  const modifyConversation = {
    participants: [
      getConversation.participant_1,
      getConversation.participant_2,
    ],
    blackList: [getConversation.blackList_1, getConversation.blackList_2],
    favoriteList: [
      getConversation.favoriteList_1,
      getConversation.favoriteList_2,
    ],
    id: getConversation.id,
    createdAt: getConversation.createdAt,
    updatedAt: getConversation.updatedAt,
  };
  return modifyConversation;
};
