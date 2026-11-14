import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Home from "../components/Home.jsx";
import Register from "../components/auth/Register.jsx";


export const AuthRoutes = () => {
  return (
  <Routes>
    <Route path="/" Component={Home} />
    <Route path="/register" Component={Register} />
    <Route path="/login" Component={Login} />
  </Routes>
  )
};
