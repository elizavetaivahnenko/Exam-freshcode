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
