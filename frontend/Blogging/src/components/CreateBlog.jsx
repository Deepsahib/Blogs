import React, { useState } from "react";
import { createBlogService } from "../services/register.jsx";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [data, setdata] = useState({
    title: "",
    description: "",
  });

  const [image, setimage] = useState(null);

  function handleDataChange(e) {
    const { value, name } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const files = e.target.files[0];
    setimage(files);
  }

  function Modifieddata() {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("imageUrl", image);

    return formdata;
  }

  async function hanldeFormSubmit(e) {
    try {
      e.preventDefault();
      let data = Modifieddata();
      if (data) {
        const response = await createBlogService(data);
      }
      toast.success(response.message)
    } catch (error) {
      console.log("error is", error.response);
    }
  }

  return (
    <div>
      CreateBlog
      <form action="" onSubmit={hanldeFormSubmit}>
        <input
          name="title"
          onChange={handleDataChange}
          value={data.title}
          type="text"
          placeholder="Enter your title her"
        />
        <input
          name="description"
          onChange={handleDataChange}
          value={data.description}
          type="text"
          placeholder="Enter your Description here"
        />
        <input onChange={handleImageChange} type="file" name="imageUrl" id="" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
