const express = require("express");
const router = express.Router();
const product = require("./ProductSchema"); //one folder back from "this" file

router.delete("/:_id", async (req, res) => {
  let mySuccess = false;
  let delID = req.params._id;
  try {
    //getting the data that is being deleted. Data's ID will be in URL/API
    const getProduct = await product.findById(delID);

    //sending response if there is no data in the database against requested-ID
    if (!getProduct) {
      return res
        .status(404)
        .send({ success: mySuccess, message: "No Product Found for this ID" });
    }
    const deletedProduct = await product.findByIdAndDelete(delID);

    mySuccess = true;
    let sendResponseData = {
      deletedData: deletedProduct,
      success: mySuccess,
    };
    res.json(sendResponseData);
  } catch (e) {
    res
      .status(400)
      .send({ success: mySuccess, message: "Internal Server Error" });
  }
});
//exporting so that it can access from other files
module.exports = router;
