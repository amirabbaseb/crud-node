const express = require("express");
const permission = require("./permission");
const brand = require("./brand");
const color = require("./color");
const item = require("./item");
const user = require("./user");

const router = express.Router();

router.use("/permission", permission);
router.use("/user", user);
router.use("/brand", brand);
router.use("/color", color);
router.use("/item", item);

module.exports = router;
