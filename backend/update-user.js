const express = require("express");
const myRouter = express.Router();
const myUser = require("./UserSchema"); // one folder back from "this" file

// Update user by status
myRouter.put("/status/:reqID4Update", async (req, res) => {
  let mySuccess = false;
  let dataUpdating = req.params.reqID4Update;

  try {
    // Check if the user with the provided status exists
    let searchingData = { status: dataUpdating };
    const getData = await myUser.find(searchingData);

    // Send response if there is no data in the database against requested status
    if (getData.length === 0) {
      return res.status(404).send({
        success: mySuccess,
        message: "No data exists having given value in endpoint",
      });
    }

    // Getting requested content from req-body
    let newName = req.body.newName;
    let newfName = req.body.newfName;

    // Creating object having updating data
    let newData = {};
    if (newName) newData.name = newName;
    if (newfName) newData.fname = newfName;

    // If no new data is provided, return a 400 response
    if (Object.keys(newData).length === 0) {
      return res.status(400).send({
        success: mySuccess,
        message: "No data provided to update",
      });
    }

    console.log("IDs Count: ", getData.length);
    const ids = getData.map((element) => element._id.toString());
    let updatedData = null;

    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      updatedData = await myUser.findByIdAndUpdate(
        element,
        { $set: newData },
        { new: true }
      );
    }

    mySuccess = true;
    res.json({
      message: "All IDs have been updated",
      success: mySuccess,
      updatedData: updatedData,
    });
  } catch (e) {
    res.status(400).send({
      success: mySuccess,
      message: "Internal Server Error",
    });
  }
});

// Update user by ID
myRouter.put("/:reqID4Update", async (req, res) => {
  let mySuccess = false;
  let idUpdating = req.params.reqID4Update;

  try {
    // Check if the user with the provided ID exists
    const getUser = await myUser.findById(idUpdating);

    if (!getUser) {
      return res.status(404).send({
        success: mySuccess,
        message: "No data exists having the ID",
      });
    }

    // Getting requested content from req-body
    let newName = req.body.newName;
    let newfName = req.body.newfName;

    // Creating object having updating data
    let newData = {};
    if (newName) newData.name = newName;
    if (newfName) newData.fname = newfName;

    // If no new data is provided, return a 400 response
    if (Object.keys(newData).length === 0) {
      return res.status(400).send({
        success: mySuccess,
        message: "No data provided to update",
      });
    }

    // Update the data in database
    const updatedData = await myUser.findByIdAndUpdate(
      idUpdating,
      { $set: newData },
      { new: true }
    );
    mySuccess = true;
    res.json({ updatedData: updatedData, success: mySuccess });
  } catch (e) {
    res.status(400).send({
      success: mySuccess,
      message: "Internal Server Error",
    });
  }
});

// Exporting so that it can access from other files
module.exports = myRouter;
