const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

module.exports = app;
