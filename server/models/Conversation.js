"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(Message, User, Catalog) {
      Conversation.hasMany(Message, {
        foreignKey: "conversation",
        targetKey: "id",
      });
      Conversation.belongsTo(User, {
        foreignKey: "participant_1",
        targetKey: "id",
      });
      Conversation.belongsTo(User, {
        foreignKey: "participant_2",
        targetKey: "id",
      });
      Conversation.belongsToMany(Catalog, {
        through: "CatalogToConversation",
        foreignKey: "conversationId",
        targetKey: "id",
      });
    }
  }
  Conversation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
