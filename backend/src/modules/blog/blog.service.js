import Blog from "./blog.model.js";

export const createBlogService = async ({
  title,
  description,
  cloudinaryImageUrl,
  user
}) => {
  
  const blogCreated = await Blog.create({
    title,
    description,
    imageUrl: cloudinaryImageUrl.url,
    userId:user
  });

  return blogCreated;
};

export const getAllBlogsService = async (id) => {
  const blogs = await Blog.find({userId:{$ne:id}});
  return blogs;
};

export const getBlogsByIdService=async(id)=>{
   const response=await Blog.findById(id);
   return response;
}

export const updateBlogService=async({id,title,description})=>{
  const updateBlog=await Blog.findByIdAndUpdate(id,{title,description},{new:true})
  return updateBlog;
}

export const getUserBlogsSercvice=async(id)=>{
 try {
 
    const getUser=await Blog.find({userId:id});

    return getUser;
 } catch (error) {
  throw new Error(error.message);
 }
}

export const deleteBlogService=async(id)=>{
 
  const deleteBlog=await Blog.findByIdAndDelete(id);
  return deleteBlog;

}
