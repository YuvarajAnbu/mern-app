const express = require("express");

const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const Product = require("../models/Product");
const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../middlewares/validator");

const router = express.Router();

// CREATE
router.post("/", auth, validateCreateProduct, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    const product = await Product.findById(id);

    if (!product) {
      return res.sendStatus(404);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ONE
router.put("/:id", auth, validateUpdateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) res.sendStatus(404);
    else res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ONE
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete all Products
// router.delete("/", async (req, res) => {
//   try {
//     await Product.deleteMany();
//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = router;
