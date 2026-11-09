import { validateRegisterUser } from "./auth.validation.js";
import { getRefreshTokenService, loginUserService, registerUserService } from "./auth.service.js";
import { GoogleAuth } from "google-auth-library";
import { errorMessage, successMessage } from "../../config/errohandler/errorhandler.js";
import { verifyJwt } from "../../config/jwt/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const isvalidate = validateRegisterUser(req.body);

    if (isvalidate) {
      const register = await registerUserService(req.body);

      return res.status(200).json({
        success: true,
        data: register,
        message: "Thanks for registering",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginuser = await loginUserService({ email, password });

    if (loginuser) {
      res.cookie("refreshToken", `${loginuser.refreshToken}`, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }

    if (loginUser) {
      return res.status(200).json({
        success: true,
        data: loginuser.user,
        token: loginuser.token,
        message: "You have been successfully LoggedIn",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    console.log("cookie is ", cookie);
    if (!cookie.refreshToken) {
      return res.status(200).json({
        status: false,
        message: "Refresh token has been expired",
      });
    }

    const verifycookie = await verifyJwt(cookie.refreshToken);

    const getrefreshToken = await getRefreshTokenService(verifycookie.userId);

    return successMessage(res, 200, true, getrefreshToken, "confirguring token", "hitted refresh token");
  } catch (error) {
    return errorMessage(res, 400, false, error.message, "Erron in refresh token");
  }
};
