import { getAccessToken, getRefreshToken } from "../../config/jwt/jwt.js";
import { User } from "../users/user.model.js";
import bcrypt from "bcrypt";

export const registerUserService = async (body) => {
  const { email, userName, password } = body;

  const registerUser = await User.findOne({ email });

  if (registerUser) {
    throw new Error("User has already been registered with us");
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const userRegister = await User.create({
    userName,
    email,
    password: hashpassword,
  });

  return userRegister;
};

export const loginUserService = async (body) => {
  const { email, password } = body;
  const isExistingUser = await User.findOne({ email });

  if (!isExistingUser) {
    throw new Error("User has not been registered with us");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    isExistingUser.password,
  );
  if (!isPasswordCorrect) {
    throw new Error("Password is not correct");
  }
  const token = await getAccessToken(isExistingUser._id);

  const refreshToken = await getRefreshToken(isExistingUser._id);

  return {
    user: {
      name: isExistingUser.userName,
      email: isExistingUser.email,
    },
    token: token,
    refreshToken
  };
};

export const getRefreshTokenService=(cookie)=>{
  if(cookie){
    const token=getAccessToken(cookie);
    return token;
  }
}