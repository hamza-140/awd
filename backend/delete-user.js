const myExpress = require("express");
const myRouter = myExpress.Router();
const myUser = require("./UserSchema"); //one folder back from "this" file

//:reqID4Delete is for getting ID from endpoint
myRouter.delete("/multi/:reqID4Delete", async (req, res) => {
  let mySuccess = false;
  let delID = req.params.reqID4Delete;

  try {
    //getting the data that is being deleted. Data's ID will be in URL/API
    let searchingData = {
      _id: delID,
    };
    const getUser = await myUser.find(searchingData);

    //sending response if there is no data in the database against requested-ID
    if (getUser.length === 0) {
      return res
        .status(404)
        .send({ success: mySuccess, message: "No User Found for this ID" });
    }

    console.log("IDs Count: ", getUser.length);
    // Extracting _id values
    const ids = getUser.map((element) => element._id.toString());

    let deletedUser = null;
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      deletedUser = await myUser.findByIdAndDelete(element);
    }

    mySuccess = true;
    let sendResponseData = {
      deletedData: deletedUser,
      success: mySuccess,
    };

    res.json(sendResponseData);
  } catch (e) {
    res
      .status(400)
      .send({ success: mySuccess, message: "Internal Server Error" });
  }
});
myRouter.delete("/:reqID4Delete", async (req, res) => {
  let mySuccess = false;
  let delID = req.params.reqID4Delete;
  try {
    //getting the data that is being deleted. Data's ID will be in URL/API
    const getUser = await myUser.findById(delID);

    //sending response if there is no data in the database against requested-ID
    if (!getUser) {
      return res
        .status(404)
        .send({ success: mySuccess, message: "No User Found for this ID" });
    }
    const deletedUser = await myUser.findByIdAndDelete(delID);

    //displaying success message and deleted-data
    mySuccess = true;
    let sendResponseData = {
      deletedData: deletedUser,
      success: mySuccess,
    };
    res.json(sendResponseData);
  } catch (e) {
    res
      .status(400)
      .send({ success: mySuccess, message: "Internal Server Error" });
  }
});
myRouter.delete("/email/:email", async (req, res) => {
  let mySuccess = false;
  let email = req.params.email;

  try {
    // Getting the data that is being deleted. Data's email will be in the URL/API
    let searchingData = {
      email: email,
    };
    const getUser = await myUser.find(searchingData);

    // Sending response if there is no data in the database against the requested email
    if (getUser.length === 0) {
      return res
        .status(404)
        .send({ success: mySuccess, message: "No User Found for this email" });
    }

    console.log("IDs Count: ", getUser.length);
    // Extracting _id values
    const ids = getUser.map((element) => element._id.toString());

    let deletedUser = null;
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      deletedUser = await myUser.findByIdAndDelete(element);
    }

    mySuccess = true;
    let sendResponseData = {
      deletedData: deletedUser,
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
module.exports = myRouter;
