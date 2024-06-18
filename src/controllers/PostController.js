import { firestore } from '../db.js';
import { createPost, addLikeToPost, getPostById } from '../models/PostModel.js';
import { updateBookmarkCount } from '../models/UserModel.js';
import { storage } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const createNewPost = async (req, res) => {
  const { userId, food, caption } = req.body;
  const image = req.file;

  try {
    const imageId = uuidv4();
    const imagePath = `images/${imageId}`;
    const imageUpload = storage.bucket().file(imagePath);

    await imageUpload.save(image.buffer);

    const post = {
      userId,
      food,
      caption,
      imageUrl: imageUpload.publicUrl(),
      likes: [],
      likeCount: 0,
      createdAt: new Date().toISOString(),
    };

    const postId = await createPost(post);

    const userPost = {
      postId,
      food,
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

export const bookmarkPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, bookmarked } = req.body;

  try {
    const userBookmarkRef = firestore
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(postId);

    if (bookmarked) {
      const post = await getPostById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      await userBookmarkRef.set(post);
      await updateBookmarkCount(userId, true);
      res.status(200).json({ message: 'Post bookmarked successfully' });
    } else {
      await userBookmarkRef.delete();
      await updateBookmarkCount(userId, false);
      res.status(200).json({ message: 'Post unbookmarked successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
