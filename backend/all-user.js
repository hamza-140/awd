const myExpress = require("express");
const myRouter = myExpress.Router();
const myUser = require("./UserSchema"); //one folder back from "this" file

//sub-route is /all-user/
myRouter.get("/all-user/", async (req, res) => {
  mySuccess = false;
  try {
    searchData = { name: "Hamza" };
    const getUser = await myUser.find(searchData);
    if (getUser.length > 0) {
      mySuccess = true;
    }
    res.json({ getData: getUser, success: mySuccess });
  } catch (e) {
    //parameter is compulsory for usage of catch()
    res
      .status(500)
      .send({ success: mySuccess, message: "Internal Server Error" });
  }
});
//exporting so that it can access from other files
module.exports = myRouter;
