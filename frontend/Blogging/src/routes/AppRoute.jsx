import { AuthRoutes } from "./AuthRoutes.jsx";
import { BlogRoutes } from "./BlogRoutes.jsx";

const AppRoute = () => {
 
  return (
    <>
      <BlogRoutes />
      <AuthRoutes />
    </>
  );
};

export default AppRoute;
