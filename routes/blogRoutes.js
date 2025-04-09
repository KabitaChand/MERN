import { createBlogPost,getAllBlogPost, getPostById } from "../controllers/blogController.js";
import express from "express";

const router= express.Router();
router.post('/create',createBlogPost);
router.get('/getAll',getAllBlogPost);
router.get('/:id',getPostById);
export default router;