import { firestore, admin } from '../db.js';

const usersCollection = firestore.collection('users');

export const createUser = async (uid, email, username) => {
  await usersCollection.doc(uid).set({
    email: email,
    username: username,
    friendCount: 0,
    createdAt: new Date().toISOString(),
  });
};

export const getUserById = async (uid) => {
  const userDoc = await usersCollection.doc(uid).get();
  return userDoc.exists ? userDoc.data() : null;
};

export const getUserByUsername = async (username) => {
  const userQuery = await usersCollection
    .where('username', '==', username)
    .get();
  if (userQuery.empty) {
    return null;
  }
  const userDoc = userQuery.docs[0];
  const userData = userDoc.data();

  const postsQuerySnapshot = await usersCollection
    .doc(userDoc.id)
    .collection('posts')
    .get();
  const posts = postsQuerySnapshot.docs.map((doc) => doc.data());

  return { ...userData, posts };
};

export const addFriend = async (userId, friendId) => {
  const userFriendRef = usersCollection
    .doc(userId)
    .collection('friends')
    .doc(friendId);
  const friendUserRef = usersCollection
    .doc(friendId)
    .collection('friends')
    .doc(userId);

  const batch = firestore.batch();

  batch.set(userFriendRef, { userId: friendId });
  batch.set(friendUserRef, { userId: userId });

  batch.update(usersCollection.doc(userId), {
    friendCount: admin.firestore.FieldValue.increment(1),
  });
  batch.update(usersCollection.doc(friendId), {
    friendCount: admin.firestore.FieldValue.increment(1),
  });

  await batch.commit();
};

export const updateUser = async (uid, data) => {
  await usersCollection.doc(uid).update(data);
};

export const deleteUser = async (uid) => {
  await usersCollection.doc(uid).delete();
};
