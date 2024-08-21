require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const student = require('./models/student.js');
const router = require('./routes/index.js');

const app = express();

//middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const app = express();
app.use(express.json());
//database
const connectDB = require("./db/connect");

//routes
const authRouter = require("./routes/authRoute");

//middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); //parse cookie in browser

app.use(morgan("tiny"));
app.use(helmet());

app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET)); // signing our cookies

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("FaceEdu Api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);
>>>>>>> dffd0868dbf56f1b0530feb6b3d108ccbdb32aa0

const port = process.env.PORT || 5000;

// routes
app.use('/', router);

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
