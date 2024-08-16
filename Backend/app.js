require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //Connect to database here
    app.listen(port, console.log(`Server is Listening on port... ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
