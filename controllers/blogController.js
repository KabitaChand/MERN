import jwt from "jsonwebtoken";
import Blog from "../models/blog.js"; // Adjust path as needed

export const createBlogPost = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Token not found in cookies" });
    }

    // Verify token and extract user details
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, userId } = decoded;

    // Create a new blog post with user details
    const blog = new Blog({
      ...req.body,
      user: userId,
      name,
      email,
    });

    await blog.save();

    // Return response
    res.status(201).json({
      message: "Congrats! You successfully created your blog 🎉",
      blog: {
        ...blog.toObject(),
        user: {
          userId,
          name,
          email,
        },
      },
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(400).json({ message: "Error creating blog!" });
  }
};
//Get post by Id
export const getAllBlogPost= async(req,res)=>{
  try{
    const blogs= await Blog.find().populate('user','name');
    res.json(blogs);

  }
  catch{
    res.status(500).json({message:"No blogs Found"});
  }
};



export const getPostById= async(req,res)=>{
  try{
    const blogs= await Blog.findById(req.params.id).populate('user','name');
    res.json(blogs);
  }
  catch{
    res.status(500).json({message:"No blogs Found"});
  }
};

