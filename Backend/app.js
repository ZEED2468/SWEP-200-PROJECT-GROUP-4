require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");

const express = require("express");
const app = express();
app.use(express.json());

//database connection connection
const connectDB = require("./db/connect");

//routes
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const studentRoutes = require("./routes/studentRoutes"); // import student routes
const faceVerificationRoutes = require('./routes/verificationRoutes'); // import face verification route
const matricRoute = require('./routes/matricRoute');

//middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); //parse cookie in browser

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET)); // signing our cookies

// routes
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", userRouter);
app.use("/api/v1/students", studentRoutes); // student routes
app.use('/api/v1', faceVerificationRoutes); // face verification route
app.use("/api/v1/matric", matricRoute)

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Basic route for testing
app.get("/cookies", (req, res) => {
  console.log(req.signedCookies);
  res.send("FaceEdu Api");
});

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the app" });
});

// Middleware for handling errors
// Middleware for handling errors
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
