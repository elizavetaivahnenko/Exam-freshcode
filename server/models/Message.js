"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: "conversationId",
        targetKey: "id",
      });
      Message.belongsTo(models.User, {
        foreignKey: "sender",
        targetKey: "id",
      });
    }
  }
  Message.init(
    {
      //conversation.... !check + models+migrations check with mongo
      conversationId: { type: DataTypes.INTEGER, allowNull: false },
      sender: { type: DataTypes.INTEGER, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
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
      modelName: "Message",
    }
  );
  return Message;
};
