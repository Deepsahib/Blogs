import React, { useEffect, useState } from "react";
import { getAllBlogsService } from "../services/register.jsx";
import { useNavigate } from "react-router-dom";

const AllBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const response = await getAllBlogsService();
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Unable to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    getAllBlogs();
  }, []);

  function handleBlogClick(id){
    navigate(`/blog/${id}`)
  }

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      {/* Header */}
   

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-10 sm:pb-16 sm:pt-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
          The Journal
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-7xl">
          Ideas worth
          <br />
          <span className="text-gray-400">your time.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
          Thoughtful stories, fresh perspectives, and ideas that
          inspire you to see things differently.
        </p>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-sm font-semibold tracking-tight">
            Latest stories
          </h2>

          <span className="text-sm text-gray-400">
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
            <h3 className="text-2xl font-semibold tracking-tight">
              Nothing here yet.
            </h3>
            <p className="mt-3 text-gray-500">
              New stories will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((blog, index) => (
              <article
              onClick={()=>{handleBlogClick(blog._id)}}
                key={blog._id || blog.id || index}
                className="group min-w-0"
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
                <div className="pt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                    Article {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                    {blog.title}
                  </h3>
                  <h1>Likes</h1>
                  {/* <h1>{count}</h1> */}

                  <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                    {blog.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      Read article
                    </span>
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

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span className="font-semibold tracking-tight text-gray-600">
            journal.
          </span>
          <span>Made for curious minds.</span>
        </div>
      </footer>
    </main>
  );
};

export default AllBlog;