import React, { useEffect, useState } from "react";
import { commentBlogService, getBlogById } from "../services/blogService.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogByID = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [showcomments, setshowcomments] = useState(false);
  const [comment, setcomment] = useState("");
  
  const { id } = useParams();

  async function getBlogsById() {
    try {
      const response = await getBlogById(id);
      if (response) {
        setdata(response.data);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getBlogsById();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return null;

  function handleComments() {
    setshowcomments(true);
  }

  function handleCommentChange(e){
    setcomment(e.target.value)
  }
  
  async function handleCommentSubmit(e){
    e.preventDefault();
    const commentBlog=await commentBlogService(id,comment);
    toast.success(commentBlog.message);
    setcomment("")
    getBlogsById();
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-8 sm:px-6 sm:py-12">
      <main className="mx-auto max-w-5xl">
        <article className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <div className="relative h-[260px] overflow-hidden bg-gray-200 sm:h-[390px] lg:h-[480px]">
            <img src={data.imageUrl} alt={data.title} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          <div className="px-6 py-8 sm:px-12 sm:py-12 lg:px-20 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Featured story</p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl">{data.title}</h1>
              <div className="my-8 h-1 w-16 rounded-full bg-indigo-600" />
              <p className="whitespace-pre-wrap text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">{data.description}</p>
            </div>
          </div>
        </article>

        <section className="mx-auto mt-8 max-w-3xl rounded-[1.5rem] border border-gray-200/80 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(15,23,42,0.4)] sm:mt-10 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Discussion</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Join the conversation</h2>
            </div>
            <button
              type="button"
              onClick={handleComments}
              className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:w-auto"
            >
              Add a comment
            </button>
          </div>

          {showcomments && (
            <form onSubmit={handleCommentSubmit} className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
              <input
                value={comment}
                name="comment"
                onChange={handleCommentChange}
                type="text"
                placeholder="Share your thoughts..."
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                Post comment
              </button>
            </form>
          )}

          <div className="mt-8 space-y-3">
            {data.comments.map((a, index) => (
              <div key={index} className="rounded-xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700">
                {a}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogByID;
