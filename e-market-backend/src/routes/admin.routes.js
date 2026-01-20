const express = require("express");
const router = express.Router();

const {
  getStats,
  getAllUsers,
} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

router.get("/stats", protect, isAdmin, getStats);
router.get("/users", protect, isAdmin, getAllUsers);

module.exports = router;
