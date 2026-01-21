const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ✅ CORS CONFIGURATION (DEV + PROD)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-market-ebon.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ PRE-FLIGHT REQUESTS
app.options("/*", cors());

// ✅ BODY PARSER
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", require("./routes/user.routes"));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API E-Market opérationnelle 🚀");
});

module.exports = app;
