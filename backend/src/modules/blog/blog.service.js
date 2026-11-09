import Blog from "./blog.model.js";

export const createBlogService = async ({
  title,
  description,
  imagekitImageUrl,
  user,
}) => {
 
  const blogCreated = await Blog.create({
    title,
    description,
    imageUrl: imagekitImageUrl.url,
    userId: user,
  });

  return blogCreated;
};

export const getAllBlogsService = async (id,page,limit) => {
  const skip = (page - 1) * limit;
  const blogs = await Blog.find({ userId: { $ne: id } }).skip(skip).limit(limit).sort({createdAt:-1});
   
  const returnData=blogs.map((a,b)=>{
    return {
      ...a.toObject(),isLiked:a.likes.includes(id),
    }
  })
  const count=await Blog.countDocuments(blogs);
  return {
    data:returnData,
    count
  }
};

export const getBlogsByIdService = async (id) => {
  const response = await Blog.findById(id);
  return response;
};

export const updateBlogService = async ({ id, title, description }) => {
  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    { title, description },
    { new: true },
  );
  return updateBlog;
};

export const getUserBlogsSercvice = async (id) => {
  try {
    const getUser = await Blog.find({ userId: id });

    return getUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteBlogService = async (id) => {
  const deleteBlog = await Blog.findByIdAndDelete(id);
  return deleteBlog;
};

export const likeUserBlogService=async(id,user)=>{
  const likeblog=await Blog.findByIdAndUpdate(id,{$addToSet:{likes:user}},{new:true});
   return {
    data:likeblog,
    length:likeblog.likes.length
   };  
}

export const dislikeBlogService=async(id,user)=>{
const dislikeBlog=await Blog.findByIdAndUpdate(id,{$pull:{likes:user}},{new:true});
 return {
  data:dislikeBlog,
  length:dislikeBlog.likes.length
 };
}