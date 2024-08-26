const mongoose = require("mongoose");
const validator = require("validator");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid Email",
    },
  },
  matric_no: {
    type: String,
    required: [true, "Please provide matric number"],
  },
  department: {
    type: String,
    required: [true, "Please provide department"],
  },
  faculty: {
    type: String,
    required: [true, "Please provide faculty"],
  },
  courses: {
    type: [String],
    required: true,
  },
  profile_pic_url: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
