import mongoose from "mongoose";

const commentModel=await mongoose.Schema({

    userId:{
        type:mongoose.Schema.ObjectId,

    }


}) 