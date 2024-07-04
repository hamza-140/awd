const express = require("express");
const router = express.Router();
const product = require("./ProductSchema");
const { body, validationResult } = require("express-validator");

router.use(express.json()); // Middleware to parse JSON bodies

router.post(
  "/",
  [
    body("name", "Name can't be empty!").notEmpty(),
    body("desc", "Description can't be empty!").notEmpty(),
    body("category", "Category can't be empty!").notEmpty(),
    body("quantity", "Quantity can't be empty!").notEmpty(),
    body("color", "Color can't be empty!").notEmpty(),
    body("price", "Price can't be empty!").notEmpty().isNumeric(),
    body("created_at", "Invalid date!").optional().isISO8601(),
  ],
  async (req, res) => {
    let mySuccess = false;
    const errors = validationResult(req); // Get errors by validationResult over "req"
    if (!errors.isEmpty()) {
      // If errors exist
      return res
        .status(400)
        .json({ errorExistAsBelow: errors.array(), success: mySuccess });
    }

    try {
      const { name, desc, category, quantity, color, price, created_at } =
        req.body;
      let existProduct = await product.findOne({ name });

      if (existProduct) {
        // Sending bad request (code: 400) with some JSON
        return res.status(400).json({
          success: mySuccess,
          errorExistAsBelow: "Sorry, this product already exists",
        });
      }

      let savingData = {
        name,
        desc,
        category,
        quantity,
        color,
        price,
        created_at: created_at || new Date(),
      };

      // Using Promises
      let newProduct = await product.create(savingData);

      mySuccess = true;

      // Create data for response
      let resData = {
        message: "Product has been inserted successfully",
        insertedData: savingData,
        success: mySuccess,
        newUserFromData: newProduct,
      };
      res.json(resData);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ success: mySuccess, message: "Some error occurred" });
    }
  }
);

module.exports = router;
