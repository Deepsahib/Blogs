import jwt from "jsonwebtoken";
import env from "../env.js";

export const getAccessToken = async (userId) => {
  const token = jwt.sign({ userId }, env.jwtAccessToken, { expiresIn: "45m" });
  return token;
};

export const getRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ userId }, env.jwtRefreshToken, {
    expiresIn: "1h",
  });
  return refreshToken;
};

export const verifyJwt = async (token) => {
  const verifyToken = jwt.verify(token, env.jwtRefreshToken);

  if (verifyToken.userId) {
    return verifyToken;
  } else {
    throw new Error("There is been a problem verifying jwt");
  }
};
