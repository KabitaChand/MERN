import mongoose from "mongoose";
const blogSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:false
  },
  content:{
    type:String,
    required:true,
    unique:false

  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:user
  }
  
},{timestamps:true}); 
const blog= mongoose.model("blog",blogSchema);
export default blog;