const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PWD, DB_HOST } = process.env;
const dbConnection = new Sequelize(
  `${DB_NAME}`,
  `${DB_USERNAME}`,
  `${DB_PWD}`,
  {
    host: `${DB_HOST}`,
    dialect: "mysql",
  }
);

module.exports = dbConnection;
