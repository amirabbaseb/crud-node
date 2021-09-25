const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../../../controller/user");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
