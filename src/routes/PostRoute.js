// routes/postRoute.js
import express from 'express';
import multer from 'multer';
import {
  createNewPost,
  likePost,
  commentOnPost,
} from '../controllers/PostController.js';

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post('/', upload.single('image'), createNewPost);
postRouter.post('/:postId/like', likePost);
postRouter.post('/:postId/comment', commentOnPost);

export default postRouter;
