
import User from "../models/user.js";
import dotenv from "dotenv";



dotenv.config();


// get all users 
export const getAllUsers=async(req,res)=>{
  try{
    const users =await User.find();
    res.json(users);
  }
  catch(error){
    res.status(500).json({message:"No Users Found"});
  }
};
