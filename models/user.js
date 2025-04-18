import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  role:{
  type:String,
  enum:["user","admin","friends"],
  default:"user",
  },
  refreshToken:{
    type:String
  },
});

const User = mongoose.model("User", userSchema); // Define model

export default User; // Export the model
