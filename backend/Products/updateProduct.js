const express = require("express");
const router = express.Router();
const product = require("./ProductSchema"); // one folder back from "this" file

// Update product by ID
router.put("/:_id", async (req, res) => {
  const productId = req.params._id;
  const getData = await product.findById(productId);
  if (!getData) {
    return res.status(404).send({
      success: false,
      message: "No product exists with the given ID",
    });
  }
  const { name, desc } = req.body;

  try {
    // Update the product and get the updated document
    const updatedProduct = await product.findOneAndUpdate(
      { _id: productId },
      { $set: { name, desc } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "No product exists with the given ID",
      });
    }

    res.json({
      message: "Product has been updated successfully",
      success: true,
      updatedProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Exporting so that it can be accessed from other files
module.exports = router;
