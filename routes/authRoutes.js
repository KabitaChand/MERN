//userRoutes.js
import {registerUser,loginUser, logoutUser} from "../controllers/authController.js";
import express from "express";
import User from "../models/user.js";


const router= express.Router();
router.post('/signup',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);



export default router;
