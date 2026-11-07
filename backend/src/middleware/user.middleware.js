import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const getUserMiddleware = async (req, res, next) => {
  try {
    const id = req.headers.authorization;
     console.log("id ",id)
    const decode = id.split(" ")[1];
    const verifyId = jwt.verify(decode, env.jwtAccessToken);

    if (verifyId) {
      req.user = verifyId.userId;
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Unauthorised",
    });
  }
};
