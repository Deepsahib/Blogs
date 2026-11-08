import dotenv from "dotenv";
dotenv.config();

const requiredenv = [
  "PORT",
  "MONGO_URI",
  "CLOUDINARY_kEY",
  "CLOUDINARY_SECRET",
  "JWT_ACCESS_TOKEN",
  "JWT_REFRESH_TOKEN",
  "IMAGE_KIT_PUBLIC",
  "IMAGE_KIT_PRIVATE",
  "IMAGE_KIT_URL",
];

requiredenv.forEach((a) => {
  if (!process.env[a]) {
    throw new Error(`Missing env variable${key}`);
  }
});

export default {
  port: process.env.PORT,
  mongo_Uri: process.env.MONGO_URI,
  cloudinary_key: process.env.CLOUDINARY_kEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
  jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
  imagekitprivate: process.env.IMAGE_KIT_PRIVATE,
  imagekitpublic: process.env.IMAGE_KIT_PUBLIC,
  imagekiturl: process.env.IMAGE_KIT_URL,
};
