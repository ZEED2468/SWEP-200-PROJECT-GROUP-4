const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const register = async (req, res) => {
  //get name , email and role
  const { email, name, password, role } = req.body;
  //check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password, role });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  //check for email and password
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
};

const logout = async (req, res) => {
  res.send("LogOut user");
};

module.exports = {
  register,
  login,
  logout,
};
