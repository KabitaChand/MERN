import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.mongodburl);
        console.log("successfully connected to database");
        
    }
    catch(error){
        console.log("Error as occured",error.message);
        
    }
    
}
export default connectdb;
