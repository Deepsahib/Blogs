import dotenv from 'dotenv';
dotenv.config();

const requiredenv=["PORT","MONGO_URI","CLOUDINARY_kEY","CLOUDINARY_SECRET","JWT_ACCESS_TOKEN","JWT_REFRESH_TOKEN"];

requiredenv.forEach((a)=>{
 if(!process.env[a]){
        throw new Error(`Missing env variable${key}`);
    }
})
   
export default{
    port:process.env.PORT,
    mongo_Uri:process.env.MONGO_URI,
    cloudinary_key:process.env.CLOUDINARY_kEY,
    cloudinary_secret:process.env.CLOUDINARY_SECRET,
    jwtAccessToken:process.env.JWT_ACCESS_TOKEN,
    jwtRefreshToken:process.env.JWT_REFRESH_TOKEN
}