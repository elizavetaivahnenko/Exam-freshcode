"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Offers", "moderationStatus", {
      type: Sequelize.ENUM("confirmed", "processing", "cancelled"),
      allowNull: false,
      defaultValue: "processing",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Offers", "moderationStatus");
  },
};
