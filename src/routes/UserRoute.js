import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:username', UserController.getUserByName);

export default router;
