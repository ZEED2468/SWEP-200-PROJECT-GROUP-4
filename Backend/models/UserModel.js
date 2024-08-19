const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Coordinator", "Supervisor"],
    default: "Coordinator",
  },
});
//Setup presave hook to hash paswords
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password method.
// UserSchema.methods.comparePassword = async function (userPassword) {
//   const isMatch = await bcrypt.compare(userPassword, this.password);
//   return isMatch;
// };

//login functionality
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide Email and Password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  return user;
};
module.exports = mongoose.model("User", UserSchema);
