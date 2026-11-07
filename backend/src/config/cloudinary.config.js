import env from "./env.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "shj1zyty",
  api_key: env.cloudinary_key,
  api_secret: env.cloudinary_secret,
});

const uploadToCloudinary = async (file) => {
  try {
    if (!file?.buffer) {
      throw new Error("Image file or buffer is missing");
    }

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "blogs",
        resource_type: "image",
        timeout: 120000,
      },
    );
    
    return result;
  } catch (error) {
    console.error("Cloudinary error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
