const express = require("express");
const cors = require("cors");


app.use(cors({
  origin: "*",
}));

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", require("./routes/user.routes"));


app.get("/", (req, res) => {
  res.send("API E-Market opérationnelle 🚀");
});

module.exports = app;
