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

export const getUserProfileService=async()=>{
  const response=await api.get("api/v1/user/getProfile");
  return response
}