const express = require("express");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const path = require("path");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    path.resolve(__dirname, "../", "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use("/user", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
