import React, { useEffect, useState } from 'react'
import { getBlogById } from '../services/register.jsx';
import { useParams } from 'react-router-dom';

const BlogByID = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  const { id } = useParams();

  async function getBlogsById() {
    try {
      setloading(true);
      const response = await getBlogById(id);
      if (response) {
        setdata(response.data);
      }
    } catch (error) {
      console.log(error);
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

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-[280px] md:h-[450px] object-cover"
          />

          <div className="px-6 py-8 md:px-12 md:py-12">

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              {data.title}
            </h1>

            <div className="w-16 h-1 bg-black rounded-full mb-8"></div>

            <p className="text-gray-600 text-lg leading-9 whitespace-pre-wrap">
              {data.description}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogByID;