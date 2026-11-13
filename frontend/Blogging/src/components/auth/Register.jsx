
import React, { useState } from "react";
import { registerUser } from "../../services/userService.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false)

  async function handleFormSubmit(e) {
    try {
      e.preventDefault();
      setloading(true)
      const response = await registerUser(data);
      console.log("response",response.success)
      if(response.data.success){
             setloading(false)
             setdata({
              userName:"",
              email:"",
              password:""
             });
      }
      if (response.data.success) {
        toast.success(response.data.message);
      }
      
    } catch (error) {
       if(error.response.data.success==false){
        setloading(false);
       }
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }

  function handleDataChange(e) {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRedirect() {
    navigate("/login");
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5 py-12">
      <Toaster position="top-right" />

      <div className="w-full max-w-[440px]">

        {/* Header */}
        <div className="mb-9 text-center">
          

          <h1 className="text-[30px] font-semibold tracking-tight text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_4px_30px_rgba(0,0,0,0.025)] sm:p-9">
          <form
            onSubmit={handleFormSubmit}
            className="space-y-5"
          >
            {/* Username */}
            <div>
              <label
                htmlFor="userName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                id="userName"
                type="text"
                name="userName"
                value={data.userName}
                onChange={handleDataChange}
                placeholder="Enter your username"
                autoComplete="username"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleDataChange}
                placeholder="name@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleDataChange}
                placeholder="Enter your password"
                autoComplete="new-password"
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.99]"
            >
              {loading?<h1>Creating</h1>:<h1>Create Account</h1>}
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleRedirect}
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
