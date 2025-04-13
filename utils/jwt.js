import jwt from "jsonwebtoken";
//function to generate access token
export const generateAccessToken= (userId, role, name,email)=>{
    return jwt.sign({userId,role,name,email}, process.env.JWT_SECRET,{expiresIn:'1h'});
};
export const generateRefreshToken=(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'});
};