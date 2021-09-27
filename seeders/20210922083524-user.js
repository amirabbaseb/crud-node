"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "amir",
        family: "ebrahimi",
        email: "amir@amir.com",
        password: "pass",
        phone: "00009999",
        address: "address 1",
        username: "amir-ebrahimi",
        password: "pass",
        image: "",
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "milad",
        family: "majd",
        email: "milad@milad.com",
        phone: "00009999",
        address: "address 1",
        username: "amir-ebrahimi",
        password: "pass",
        image: "",
        permission_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "amir abbas",
        family: "ebrahimzade",
        email: "amirabbas@gmail.com",
        phone: "00009999",
        address: "address 1",
        username: "amir-ebrahimi",
        password: "pass",
        image: "",
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
