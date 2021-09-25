const express = require("express");
const {
  getItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require("../../../controller/item");

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
