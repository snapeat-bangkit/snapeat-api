// controllers/postController.js
import {
  createPost,
  getPostById,
  addLikeToPost,
  addCommentToPost,
} from '../models/PostModel.js';
import { storage } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const createNewPost = async (req, res) => {
  const { userId, content } = req.body;
  const image = req.file;

  try {
    const imageId = uuidv4();
    const imagePath = `images/${imageId}`;
    const imageUpload = storage.bucket().file(imagePath);

    await imageUpload.save(image.buffer);

    const post = {
      userId,
      content,
      imageUrl: imageUpload.publicUrl(),
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    const postId = await createPost(post);
    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    await addLikeToPost(postId, userId);
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;

  try {
    const commentData = {
      userId,
      comment,
      createdAt: new Date().toISOString(),
    };

    await addCommentToPost(postId, commentData);
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
