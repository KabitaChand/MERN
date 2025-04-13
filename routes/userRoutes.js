//userRoutes.js
import {getAllUsers} from "../controllers/userController.js";
import express from "express";
import User from "../models/user.js";


const router= express.Router();
router.get('/getUsers',getAllUsers);



export default router;
