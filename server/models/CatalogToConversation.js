"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CatalogToConversation extends Model {
    static associate(models) {
      CatalogToConversation.belongsToMany(models.User, {
        foreignKey: { field: "id" },
      });
    }
  }
  CatalogToConversation.init(
    {
      catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      sequelize,
      modelName: "CatalogToConversation",
    }
  );
  return CatalogToConversation;
};
