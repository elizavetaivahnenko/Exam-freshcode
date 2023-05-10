"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(models) {
      Catalog.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Catalog.belongsToMany(models.Conversation, {
        through: "CatalogToConversation",
        foreignKey: "catalogId",
        targetKey: "id",
      });
    }
  }
  Catalog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      catalogName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Catalog",
    }
  );
  return Catalog;
};
