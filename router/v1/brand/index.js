const express = require("express");
const {
  getBrands,
  createBrands,
  deleteBrands,
  updateBrands,
  getBrandsById,
} = require("../../../controller/brand");

const router = express.Router();

router.get("/", getBrands);
router.post("/", createBrands);
router.get("/:id", getBrandsById);
router.delete("/:id", deleteBrands);
router.put("/:id", updateBrands);

module.exports = router;
