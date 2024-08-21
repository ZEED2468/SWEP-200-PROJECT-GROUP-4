const User = require("../models/UserModel");
const SuperAdmin = require("../models/SuperAdminModel");
const Token = require("../models/TokenModel");
const { createJWT, attachCoookiesToResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const generatedCodes = new Set();
function generateUniqueCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code;

  do {
    code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  } while (generatedCodes.has(code));

  generatedCodes.add(code);
  return code;
}

//ONLY REGISTER AS A SUPERADMIN
const register = async (req, res) => {
  //get name , email and role
  const { email, name, password } = req.body;
  //check if email already exists
  const emailAlreadyExists = await SuperAdmin.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const superAdminToken = generateUniqueCode();

  const superAdmin = await SuperAdmin.create({ email, password });

  const superadmin_id = await SuperAdmin.findOne({ email }, "_id"); //get id

  const createToken = await Token.create({
    token: superAdminToken,
    superadmin_id: superadmin_id._id,
  });

  const token_id = await Token.findOne({ superadmin_id }, "_id");
  const user = await User.create({
    name,
    email,
    password,
    token_id: token_id._id,
    role: "Coordinator",
  });
  //?Here
  const tokenUser = createTokenUser(user);

  attachCoookiesToResponse({ res, user: tokenUser });

  const userdetails = {
    superAdmin,
    createToken,
    user,
    tokenUser,
  };

  res.status(StatusCodes.CREATED).json({ userdetails });
};

const login = async (req, res) => {
  //check for email and password
  const { email, password, token, name } = req.body;
  //Login via token

  if (token) {
    const usertoken = await Token.findOne({ token });
    if (!usertoken) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const token_id = usertoken._id;

    const user = await User.findOne({ token_id });
    //const tokenUser = createJWT(user);
    const tokenUser = createTokenUser(user);

    attachCoookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user, tokenUser });
  } else {
    try {
      const user = await User.login(email, password);
      const tokenUser = createTokenUser(user);

      attachCoookiesToResponse({ res, user: tokenUser });

      res.status(StatusCodes.OK).json({ user, tokenUser });
    } catch (error) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
  }
};

const logout = async (req, res) => {
  res.cookie("tokenUser", "Logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 3000),
    signed: true,
  });
  res.send("LogOut user");
};

module.exports = {
  register,
  login,
  logout,
};
