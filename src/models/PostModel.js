// models/postModel.js
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

export const addLikeToPost = async (postId, userId) => {
  const postRef = postsCollection.doc(postId);
  await postRef.update({
    likes: admin.firestore.FieldValue.arrayUnion(userId),
  });
};

export const addCommentToPost = async (postId, comment) => {
  const postRef = postsCollection.doc(postId);
  await postRef.update({
    comments: admin.firestore.FieldValue.arrayUnion(comment),
  });
};
