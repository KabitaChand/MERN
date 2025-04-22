import { createBlogPost, getAllBlogPost, getPostById } from "../controllers/blogController.js";
import express from "express";
import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Correct usage of authorize middleware
router.post('/create', verifyToken, authorize("admin"),createBlogPost);
router.get('/getAll', getAllBlogPost);
router.get('/:id', getPostById);

export default router;
