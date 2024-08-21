const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return jwtToken;
};

//verify token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCoookiesToResponse = ({ res, user }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const tokenUser = createJWT({ payload: user });
  res.cookie("tokenUser", tokenUser, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
module.exports = {
  createJWT,
  isTokenValid,
  attachCoookiesToResponse,
};
