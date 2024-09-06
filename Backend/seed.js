require("dotenv").config();
//const mongoose = require('mongoose');
const mockData = require("./mockdata.json");

const StudentModel = require("./models/StudentModel");

const connectDB = require("./db/connect");

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await StudentModel.deleteMany();
    await StudentModel.create(mockData);
    console.log("Success !!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
seed();
