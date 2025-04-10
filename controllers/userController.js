import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all required fields: name, email, and password."
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already associated with an account. Please use another email."
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12); // Use a reasonable salt rounds, 12 is good

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user in the database
    await newUser.save();

    // Send response back to client indicating successful registration
    res.status(201).json({
      message: "User successfully created. You can now log in."
    });
  } catch (error) {
    // Handle any server-side errors
    console.error('Error creating user:', error); // Log error for debugging
    res.status(500).json({
      message: "An error occurred while creating your account. Please try again later."
    });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Enter both email and password" });
  }

  try {
    const existingUser = await User.findOne({ email }); // ✅ Use User (capital U)
    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "This user does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password incorrect! Enter correct password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id,
        email:email,
       },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    const { password: _, ...userData } = existingUser.toObject();
    return res.json({ message: "Login successful", user: userData, token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};

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
export const logoutUser = (req, res) => {
  try {
      // Clear the token cookie
      res.clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
      });
      res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
  }
};