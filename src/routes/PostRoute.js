import express from 'express';
import multer from 'multer';
import {
  createNewPost,
  likePost,
  bookmarkPost,
} from '../controllers/PostController.js';

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post('/', upload.single('image'), createNewPost);
postRouter.post('/:postId/like', likePost);
postRouter.post('/:postId/bookmark', bookmarkPost);

export default postRouter;
