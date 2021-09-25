require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db.config");
const route = require("./router");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", route);

const connectToDb = async () => {
  try {
    await dbConnection.authenticate();
    console.log("Connect to DB Successfully!");
  } catch (error) {
    console.log("Something went Wrong!", error);
  }
};
connectToDb();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
