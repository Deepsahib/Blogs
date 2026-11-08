import imagekit from "./imagekit.config.js";

export const uploadToImagekit = async (file) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};
