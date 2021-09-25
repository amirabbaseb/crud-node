"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "amir",
        family: "family",
        email: "example@example.com",
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "amir ali",
        family: "family",
        email: "example@example.com",
        permission_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "amir abbas",
        family: "family",
        email: "example@example.com",
        permission_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
