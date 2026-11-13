import React, { useEffect, useState } from "react";
import { getUserProfileService } from "../services/userService.js";

const Myprofile = () => {
    const [data, setdata] = useState(null)
  const getMyprofile = async () => {
    const getprofile = await getUserProfileService();
    setdata(getprofile.data)
    console.log("getprofile", getprofile);
  };
  useEffect(() => {
    getMyprofile();
  }, []);

  console.log("data is",data)
  return (
    <div>
      <h1>{data?.data?.userName}</h1>
    <h1>{data?.data?.email}</h1>
    </div>
  );
};

export default Myprofile;
