import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import env from './config/env.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { connectDB } from './config/db.js';
import { blogroutes } from './modules/blog/blog.routes.js';
import { indexRoutes } from './routes/index.routes.js';
import cookieParser from 'cookie-parser';

const app=express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("Api is working fine")
})
app.use("/api/v1",indexRoutes)


app.listen(env.port,()=>{
    connectDB();
    console.log(`Server is running at port ${env.port}`)
})