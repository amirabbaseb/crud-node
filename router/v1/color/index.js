const express = require("express");
const {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} = require("../../../controller/color");

const router = express.Router();

router.get("/", getColors);
router.post("/", createColor);
router.delete("/:id", deleteColor);
router.put("/:id", updateColor);
router.get("/:id", getColorById);

module.exports = router;
