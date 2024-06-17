import { firestore } from '../db.js';
import { createPost, addLikeToPost } from '../models/PostModel.js';
import { storage } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const createNewPost = async (req, res) => {
  const { userId, caption } = req.body;
  const image = req.file;

  try {
    const imageId = uuidv4();
    const imagePath = `images/${imageId}`;
    const imageUpload = storage.bucket().file(imagePath);

    await imageUpload.save(image.buffer);

    const post = {
      userId,
      caption,
      imageUrl: imageUpload.publicUrl(),
      likes: [],
      likeCount: 0,
      createdAt: new Date().toISOString(),
    };

    const postId = await createPost(post);

    const userPost = {
      postId,
      caption,
      imageUrl: imageUpload.publicUrl(),
      likes: [],
      likeCount: 0,
      createdAt: new Date().toISOString(),
    };

    await firestore
      .collection('users')
      .doc(userId)
      .collection('posts')
      .doc(postId)
      .set(userPost);

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
