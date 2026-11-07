import api from "../api/axios.js";

export const registerUser = async (data) => {
  const response = await api.post("/api/v1/auth/register", data);
  return response;
};

export const loginUserService = async (data) => {
  const response = await api.post("/api/v1/auth/login", data, {
    withCredentials: true,
  });
  return response;
};

export const createBlogService = async (data) => {
  const response = await api.post("api/v1/blog/create", data);
  return response;
};

export const getAllBlogsService = async () => {
  const repsonse = await api.get("api/v1/blog/all");
  return repsonse.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`api/v1/blog/${id}`);
  return response.data;
};

export const getUserBlogsService = async () => {
  const response = await api.get("api/v1/blog/user");

  return response.data;
};

export const EditBlogService = async (id,data) => {
  const response = await api.post(`api/v1/blog/edit/${id}`, data);
  return response
};

export const deleteBlogService=async(id)=>{
  const response=await api.delete(`api/v1/blog/delete/${id}`);
  return response;
}