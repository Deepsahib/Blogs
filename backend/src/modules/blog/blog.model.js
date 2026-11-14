import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    category:{
      type:String
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
     {default:0}
    ],
   comments:[
    {type:String}
   ]
  },
  { timestamps: true },
);

const Blog = new mongoose.model("Blogs", blogSchema);
export default Blog;
