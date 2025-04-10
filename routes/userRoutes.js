//userRoutes.js
import {registerUser,loginUser, getAllUsers, logoutUser} from "../controllers/userController.js";
import express from "express";
import User from "../models/user.js";

const router= express.Router();
router.post('/signup',registerUser);
router.post('/login',loginUser);
router.get('/getUsers',getAllUsers);
router.get('/logout', logoutUser);


export default router;
