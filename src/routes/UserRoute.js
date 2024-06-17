import express from 'express';
import {
  registerUser,
  loginUser,
  searchByUsername,
} from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/login', loginUser);
userRouter.get('/search/:username', searchByUsername);

export default userRouter;
