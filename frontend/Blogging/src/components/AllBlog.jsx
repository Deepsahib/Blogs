import React, { useEffect, useState } from "react";
import { getAllBlogsService, likeBlogService } from "../services/register.jsx";
import { useNavigate } from "react-router-dom";

const AllBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState(0)
  const navigate = useNavigate();

  const limit = 10;
  

  async function getAllBlogs() {
    try {
      const response = await getAllBlogsService(page,limit);
      setData(response.data.data);
      const totalPages = Math.ceil(response.data.count / limit);
      settotalpage(totalPages)
    } catch (err) {
      setError("Unable to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, [page]);

  function handleBlogClick(id) {
    navigate(`/blog/${id}`);
  }

  async function handleBlogLike(blog) {
    const likeblog = await likeBlogService(blog._id, true);
    getAllBlogs();
  }

  function handleNextClick() {
    if(page===totalpage){
      return
    }
    setpage((prev) => prev + 1);

  }

  function handlePreviousClick() {
    if(page==1){
      return 
    }
    setpage((prev) => prev - 1);
    
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1d1d1f]">
      {/* Header */}

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
          The Journal
        </div>

        <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.06em] sm:text-7xl">
          Ideas worth
          <br />
          <span className="text-gray-400">your time.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
          Thoughtful stories, fresh perspectives, and ideas that inspire you to see things differently.
        </p>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-gray-700">Latest stories</h2>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            {data.length} articles
          </span>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-gray-100" />
                <div className="mt-5 h-5 w-3/4 rounded bg-gray-100" />
                <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-700"
            >
              Try again
            </button>
          </div>
        ) : data.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Nothing here yet.</h3>
            <p className="mt-3 text-gray-500">New stories will appear here soon.</p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((blog, index) => (
              <article
                onClick={() => {
                  handleBlogClick(blog._id);
                }}
                key={blog._id || blog.id || index}
                className="group min-w-0 cursor-pointer rounded-3xl border border-gray-200/80 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title || "Blog cover"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="px-2 pb-2 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                    Article {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    {blog.title}
                  </h3>
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      handleBlogLike(blog);
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
                  >
                    <span className={blog.isLiked ? "text-red-500" : "text-gray-400"} aria-hidden="true">
                      ♡
                    </span>
                    <span>{blog?.likes?.length || 0}</span>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500 sm:text-base">{blog.description}</p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Read article</span>
                    <span
                      aria-hidden="true"
                      className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <h1 onClick={handleNextClick}>Next</h1>
      <h1>Showing {page} out of {totalpage}</h1>
      <h1 onClick={handlePreviousClick}>Previous</h1>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span className="font-semibold tracking-tight text-gray-600">journal.</span>
          <span>Made for curious minds.</span>
        </div>
      </footer>
    </main>
  );
};

export default AllBlog;
