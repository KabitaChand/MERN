import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app= express();
connectdb();  //connects mongodb
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api',userRoutes);
app.use('/api',blogRoutes);
app.use('/api/auth',authRoutes);


app.use('/api',(req,res)=>{
  res.send('server is running');
});


//start server
const PORT=8080;

app.listen(PORT,()=>{
    console.log(`The server is currently running at port ${PORT}`);
});
