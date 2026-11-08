import uploadToCloudinary from "../../config/cloudinary.config.js";
import { errorMessage, successMessage } from "../../config/errohandler/errorhandler.js";
import { uploadToImagekit } from "../../config/imagekitImageuploader.js";
import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  getBlogsByIdService,
  getUserBlogsSercvice,
  likeUserBlogService,
  updateBlogService,
} from "./blog.service.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { user } = req;
    const file = req.file;

    const imagekitImageUrl = await uploadToImagekit(file);

    const create = await createBlogService({
      title,
      description,
      imagekitImageUrl,
      user,
    });

    return successMessage(res, 200, true, create, "All blogs has been fetched successfully");
  } catch (error) {
    return errorMessage(res, 400, false, error.message, "There has been error fetching blogs");
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { user } = req;

    const allBlogs = await getAllBlogsService(user);
    if (!allBlogs) {
      return res.status(400).json({
        success: false,
        message: "No blog has been found",
      });
    }
    return res.status(200).json({
      success: true,
      data: allBlogs,
      message: "All blogs has been fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: `There was a error fetch blog ${error.message}`,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogById = await getBlogsByIdService(id);
    if (blogById) {
      return res.status(200).json({
        success: true,
        data: blogById,
        messsage: "You blog has been fetched",
      });
    }
  } catch (error) {
    return res.status(400).json({
      succes: "false",
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedBlog = await updateBlogService({ id, title, description });
    return successMessage(res, 200, true, updatedBlog, "Your blog has been updated");
  } catch (error) {
    return errorMessage("false", error.message, "There is an error updating your blog");
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const { user } = req;

    const userBlogs = await getUserBlogsSercvice(user);

    let sahib = successMessage(res, 200, "true", userBlogs, "Fetched successfully");
  } catch (error) {
    return errorMessage("false", error.message, "we are not able to get user blogs");
  }
};

export const deleteUserBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlogs = await deleteBlogService(id);
    return successMessage(res, 200, true, deleteBlogs, "Your blog has been deleted successfully");
  } catch (error) {
    return errorMessage(false, error.message, "Error happened while deleting");
  }
};

export const likeUserBlog = async (req, res) => {
  console.log("came to likeuserbloh");
  const { status } = req.body;
  console.log("status is ", status);
  const { id } = req.params;
  const likeuserblog = await likeUserBlogService(id);
  if (likeUserBlog) {
    res.send("Hello world");
  }
};
