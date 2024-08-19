require("dotenv").config();
require("express-async-errors");
const express = require("express");
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

app.use(morgan("tiny"));

app.use("/api/v1/auth", authRouter);

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
