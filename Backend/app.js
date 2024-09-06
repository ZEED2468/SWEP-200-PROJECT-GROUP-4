require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const student = require('./models/student.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//database
const connectDB = require("./db/connect");

//routes
const authRouter = require("./routes/authRoute");
const matricRoute = require("./routes/matricRoute.js");

//middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); //parse cookie in browser

app.use(morgan("tiny"));
app.use(helmet());

app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// signing our cookies

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("FaceEdu Api");
});

app.use(authRouter);
app.use(matricRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;


const start = async () => {
  try {
    //Connect to database here
   await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is Listening on port... ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
