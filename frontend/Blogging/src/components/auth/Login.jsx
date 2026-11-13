import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loginUserService } from "../../services/User.service.jsx";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const [showpassword, setshowpassword] = useState(false);

  const [errors, seterrors] = useState({});

  function handleDataChange(e) {
    seterrors({});
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleDataSubmit(e) {
    try {
      e.preventDefault();

      const response = await loginUserService(data);
      console.log("response from backend", response);
      if (response.data.success == true) {
        toast.success(response.data.message);
      }
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  const formValidation = () => {
    const newErrors = {};

    if (data.email === "") {
      newErrors.email = "Email should be provided";
    }

    if (data.password === "") {
      newErrors.password = "Password should be provided";
    }

    seterrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans text-[#1d1d1f]">
      <Toaster position="top-right" />
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;{/* Top Navigation */}
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d1d1f] text-sm font-semibold text-white"
          >
            S
          </div>
          <span className="text-lg font-semibold tracking-tight">Studio</span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-sm font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
        >
          Create account
          <span className="ml-1">↗</span>
        </button>
      </header>
      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-11 text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#e5e5e7] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-[#86868b]">
              WELCOME BACK
            </div>

            <h1 className="text-[38px] font-semibold leading-tight tracking-[-1.5px] sm:text-[44px]">Sign in.</h1>

            <p className="mt-3 text-[15px] leading-6 text-[#86868b]">
              Good to have you back.
              <br />
              Enter your details to continue.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleDataSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-[#424245]">
                Email address
              </label>

              <input
                id="email"
                value={data.email}
                name="email"
                onChange={handleDataChange}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-[15px] text-[15px] text-[#1d1d1f] outline-none transition-all duration-200 placeholder:text-[#a1a1a6] hover:border-[#a1a1a6] focus:border-[#0071e3] focus:ring-[3px] focus:ring-[#0071e3]/10"
              />

              {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-[#424245]">
                Password
              </label>

              <input
                id="password"
                value={data.password}
                name="password"
                onChange={handleDataChange}
                type={showpassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-[15px] text-[15px] text-[#1d1d1f] outline-none transition-all duration-200 placeholder:text-[#a1a1a6] hover:border-[#a1a1a6] focus:border-[#0071e3] focus:ring-[3px] focus:ring-[#0071e3]/10"
              />
              <button
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
              >
                Show
              </button>
              {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d1d1f] px-5 py-[15px] text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#38383c] active:scale-[0.99]"
            >
              Continue
              <span className="text-lg font-light">→</span>
            </button>
          </form>

          {/* Register */}
          <div className="mt-9 text-center">
            <p className="text-[14px] text-[#86868b]">
              New here?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-[#0071e3] transition-colors hover:text-[#0077ed] hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>

          {/* Bottom Note */}
          <div className="mt-12 border-t border-[#e8e8ed] pt-7">
            <p className="text-center text-xs leading-5 text-[#a1a1a6]">
              A simple, secure space for everything you do.
            </p>
          </div>
        </div>
      </main>
      <button onClick={() => toast.success("hello world")}>Test toast</button>
      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-[#a1a1a6]">© 2026 Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
