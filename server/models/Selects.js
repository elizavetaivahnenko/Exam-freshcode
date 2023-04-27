"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Select extends Model {}
  Select.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      describe: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Select",
      tableName: "Selects",
      timestamps: false,
    }
  );
  return Select;
};
