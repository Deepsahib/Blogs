import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: "10000",
});

const refreshApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.dir("error", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 400 &&
      error.response.data.message == "Unauthorised"
    ) {
      try {
        console.log("coming to this api");
        // if (!refreshPromise) {
        //   refreshPromise = 
          refreshApi
            .post("/api/v1/auth/refresh-token")
            .then((response) => {
              console.log("api interceptor response",response);
              const newToken = response.data.data;

              localStorage.setItem("token", newToken);

              return newToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        

        // const newToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
