const express = require("express");
const {
  getPermissions,
  deletePermission,
  getPermissionById,
  updatePermission,
  createPermission,
} = require("../../../controller/permission");

const router = express.Router();

router.get("/", getPermissions);
router.post("/", createPermission);
router.delete("/:id", deletePermission);
router.put("/:id", updatePermission);
router.get("/:id", getPermissionById);

module.exports = router;
