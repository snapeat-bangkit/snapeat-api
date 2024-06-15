import { auth, firestore } from '../db.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    await firestore.collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
