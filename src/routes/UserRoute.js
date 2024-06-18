import express from 'express';
import {
  registerUser,
  loginUser,
  searchByUsername,
  addFriendToUser
} from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/search/:username', searchByUsername);
userRouter.post('/addFriend/:friendId', addFriendToUser)

export default userRouter;
