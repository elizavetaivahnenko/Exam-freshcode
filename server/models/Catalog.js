"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(Conversation, User) {
      Catalog.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Catalog.belongsToMany(Conversation, {
        through: "CatalogToConversation",
        foreignKey: "catalogId",
        targetKey: "id",
      });
    }
  }
  Catalog.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
