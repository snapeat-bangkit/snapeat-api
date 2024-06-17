// models/PostModel.js
import { firestore, admin } from '../db.js';

const postsCollection = firestore.collection('posts');

export const createPost = async (post) => {
  const postRef = postsCollection.doc();
  await postRef.set(post);
  return postRef.id;
};

export const getPostById = async (postId) => {
  const postDoc = await postsCollection.doc(postId).get();
  return postDoc.exists ? postDoc.data() : null;
};

export const addLikeToPost = async (postId, likingUserId) => {
  // Rename the parameter to avoid conflict
  const postRef = postsCollection.doc(postId);
  const postDoc = await postRef.get();
  if (!postDoc.exists) {
    throw new Error('Post not found');
  }

  const post = postDoc.data();
  const postOwnerId = post.userId; // Rename the variable to avoid conflict

  const userPostRef = firestore
    .collection('users')
    .doc(postOwnerId)
    .collection('posts')
    .doc(postId);

  const updateData = {
    likes: admin.firestore.FieldValue.arrayUnion(likingUserId),
    likeCount: admin.firestore.FieldValue.increment(1),
  };

  await postRef.update(updateData);
  await userPostRef.update(updateData);
};
