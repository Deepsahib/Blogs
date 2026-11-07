import React, { useEffect, useState } from "react";
import { deleteBlogService, EditBlogService, getUserBlogsService } from "../services/register.jsx";
import toast, { Toaster } from "react-hot-toast";

const Blogs = () => {
  const [data, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [id, setid] = useState(null);
  const [values, setvalues] = useState({
    title: "",
    description: "",
  });

  async function getUserBlogs() {
    try {
      const userBlogs = await getUserBlogsService();
      setdata(userBlogs.data);
    } catch (error) {
      toast.error(error.data);
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, []);

  function handleValueChange(e) {
    const { name, value } = e.target;
    setvalues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const editedForm = await EditBlogService(id, values);
       if(editedForm.data.success==true){
        toast.success(editedForm.data.message)
        setTimeout(() => {
           setopen(false);
        getUserBlogs();
        },1000);
       }
    } catch (error) {
      console.dir("error is ",error);
    }
  }

  function handleEditBlog(item) {
    console.log("item is ",item);
    setid(item._id);
    setvalues({
      title:item.title,
      description:item.description
    })
    setopen(true);
  }
  
  async function hanldeBlogDelete(item){
    console.log("came here in delete function ")
    setopendelete(true);
     const deleteBlog=await deleteBlogService(item._id);
    console.log("response",deleteBlog)
    getUserBlogs();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 sm:px-10">
      <Toaster />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Blogs
          </h1>
          <p className="mt-2 text-gray-500">
            Manage all your articles in one place.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mb-6 line-clamp-3 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                <div className="flex gap-3 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEditBlog(item)}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Edit Blog
                  </button>

                  <button onClick={()=>hanldeBlogDelete(item)} className="flex-1 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit your Blog
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Update your blog details below.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Blog Title
                  </label>
                  <input
                    onChange={handleValueChange}
                    name="title"
                    value={values.title}
                    type="text"
                    placeholder="Enter blog title"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    onChange={handleValueChange}
                    name="description"
                    value={values.description}
                    rows="6"
                    placeholder="Write your blog description..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setopen(false)}
                    className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Blogs;
