import React from "react";
import { useNavigate } from "react-router-dom";
import Myprofile from "./Myprofile.jsx";

const Navbar = () => {

  const navigate=useNavigate();

  const navbaritems = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
    { title: "Categories", path: "/categories" },
    { title: "Get started", path: "/login" },
    { title: "Create Blog", path: "/create-blog" },
    { title: "Your Blogs", path: "user-blog" },
  ];

  function handleRoutes(path) {
    navigate(path)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <h1 className="cursor-pointer text-xl font-semibold tracking-tight text-gray-900">
          journal<span className="text-gray-400">.</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-8">
          {navbaritems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleRoutes(item.path)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                item.title === "Get started"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
       <Myprofile/>
    </nav>
  );
};

export default Navbar;