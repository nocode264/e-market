const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// ⚡ CORS GLOBAL - compatible Render/Vercel
app.use(cors({
  origin: '*', // autorise toutes les origines
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API E-Market opérationnelle 🚀");
});

module.exports = app;
