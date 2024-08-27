const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const requireAuth = async (req, res, next) => {
  const token = req.signedCookies.tokenUser;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });

    req.user = {
      name,
      userId,
      role,
    };

    console.log(req.user);

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

module.exports = requireAuth;
