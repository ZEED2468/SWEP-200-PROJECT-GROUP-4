require("dotenv").config();
require("express-async-errors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const express = require("express");
const student = require('./models/student.js');
const router = require('./routes/index.js');

const app = express();

//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const port = process.env.PORT || 5000;

// routes
app.use('/', router);

const start = async () => {
  try {
    //Connect to database here
    mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then((result) => app.listen(port, console.log(`Server is Listening on port... ${port}`)) )
  .catch((err) => console.log(err) );

  } catch (error) {
    console.log(error);
  }
};
start();
