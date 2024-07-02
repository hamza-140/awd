//File: register-user.js in ROOT-FOLDER/myFiles/ folder

const myExpress = require("express");
const myRouter = myExpress.Router();
const myUser = require("./UserSchema"); //one folder back from "this" file

const { body, validationResult } = require("express-validator");
const myBcrypt = require("bcrypt");

//sub-route is /register-user/
myRouter.post(
  "/",
  [
    body("email", "email is not valid").isEmail(),
    body("password", "Password cannot be null").exists(),
    body("name", "Please write your name").exists(),
  ],
  async (req, res) => {
    let mySuccess = false;
    const myError = validationResult(req); //getting error by validationResult over "req"
    if (!myError.isEmpty()) {
      //if error exists
      //error status along with errors in array format
      //sending bad request (code: 400) with some JSON
      return res
        .status(400)
        .json({ errorExistAsBelow: myError.array(), success: mySuccess });
    }
    try {
      let myemail = req.body.email;
      //console.log("myemail: ", myemail)
      let myname = req.body.name;
      let myfname = req.body.fname;
      let mypassword = req.body.password;
      //encryption using salt of bcrypt
      const mySalt = await myBcrypt.genSalt(10); //Salt value for 10 characters
      let securePassword = await myBcrypt.hash(mypassword, mySalt);
      mypassword = securePassword;
      let mystatus = req.body.status;
      let existUser = await myUser.findOne({ email: req.body.email });
      if (existUser) {
        //sending bad request (code: 400) with some JSON
        return res.status(400).json({
          success: mySuccess,
          errorExistAsBelow: "Sorry, this email already exists",
        });
      }
      let savingData = {
        email: myemail,
        name: myname,
        fname: myfname,
        password: mypassword,
        status: mystatus,
      };
      //let myData = myUser(savingData)
      //myData.save()

      //using Promises
      let myNewUser = await myUser.create(savingData);

      mySuccess = true;

      //create data for response
      let resData = {
        message: "Data has been inserted successfully",
        insertedData: savingData,
        success: mySuccess,
        newUserFromData: myNewUser,
      };
      res.json(resData);
    } catch (myError) {
      console.log(myError.message);
      res
        .status(500)
        .send({ success: mySuccess, message: "some error occured" });
    }
  }
);

//exporting so that it can access from other files
module.exports = myRouter;
