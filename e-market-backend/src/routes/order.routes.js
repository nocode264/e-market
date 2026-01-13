const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const { protect } = require("../middlewares/auth.middleware");

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  res.status(403).json({ message: "Accès admin requis" });
};

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
