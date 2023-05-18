const { Catalog, Conversation } = require("../../models");
module.exports.getCatalog = async (predicate) => {
  const catalog = await Catalog.findOne({
    where: predicate,
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

module.exports.getCatalogsQuery = async (predicate) => {
  const catalogs = await Catalog.findAll({
    where: {
      userId: predicate,
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
  return modifiedCatalogs;
};
