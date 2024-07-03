const myConnectionToDB = require("./db"); //getting connectToMongo() from db.js that was exported
//running above required-code
myConnectionToDB();

const express = require("express");

//adding package that will allow communication with frontend
const cors = require("cors");

const app = express();

app.use(cors());

//allowing communication on base of json
app.use(express.json());

//route for all-user
app.use("/user", require("./all-user")); //displaying all user
app.use("/user/register-user", require("./register-user"));
app.use("/user/delete-user", require("./delete-user"));
app.use("/user/update-user", require("./update-user"));

app.get("/", (req, res) => {
  res.send(`
    <div style="display: flex; justify-content: center; align-items: center;height:100vh">
      <h1>HomePage</h1>
    </div>
  `);
});
const port = 5000;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
