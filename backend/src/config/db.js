import mongoose from "mongoose"
import env from "./env.js";


export const connectDB=async()=>{
     try {
         await mongoose.connect(env.mongo_Uri);
         console.log("monogdb has been connected")
     } catch (error) {
        console.log("There is been an error connecting to the mongodb")
     }
   
}