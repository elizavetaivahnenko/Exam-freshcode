"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: "conversationId",
        targetKey: "id",
      });
      Conversation.belongsTo(models.User, {
        foreignKey: "participant_1",
        targetKey: "id",
      });
      Conversation.belongsTo(models.User, {
        foreignKey: "participant_2",
        targetKey: "id",
      }); //???????? 2

      Conversation.belongsToMany(models.Catalog, {
        through: "CatalogToConversation",
        foreignKey: "conversationId",
        targetKey: "id",
      });
    }
  }
  Conversation.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false },
      participant_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      participant_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      blackList_1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      blackList_2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favoriteList_1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favoriteList_2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
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
      modelName: "Conversation",
    }
  );
  return Conversation;
};
