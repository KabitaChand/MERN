//userRoutes.js
import {registerUser,loginUser} from "../controllers/userController.js";
import express from "express";

const router= express.Router();
router.post('/signup',registerUser);
router.post('/login',loginUser);

export default router;
