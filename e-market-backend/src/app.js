const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// ✅ CORS propre pour frontend déployé + localhost
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-market-ebon.vercel.app",
  "https://e-market-m3nkkdxbp-mohameds-projects-5089f233.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // autoriser les requêtes sans origin (Postman, tests server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy: access denied"));
    }
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
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
