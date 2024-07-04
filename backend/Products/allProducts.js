const express = require("express");
const router = express.Router();
const product = require("./ProductSchema");

router.get("/", async (req, res) => {
  try {
    const products = await product.find();

    res.json({ products: products });
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
