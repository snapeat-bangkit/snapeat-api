// routes/postRoute.js
import express from 'express';
import multer from 'multer';
import { createNewPost, likePost } from '../controllers/PostController.js';

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post('/', upload.single('image'), createNewPost);
postRouter.post('/:postId/like', likePost);

export default postRouter;
