const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  protect,
  isSellerOrAdmin,
} = require("../middlewares/auth.middleware");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, isSellerOrAdmin, createProduct);
router.put("/:id", protect, isSellerOrAdmin, updateProduct);
router.delete("/:id", protect, isSellerOrAdmin, deleteProduct);

module.exports = router;
