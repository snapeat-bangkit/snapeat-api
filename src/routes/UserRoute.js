import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/login', loginUser);

export default userRouter;

