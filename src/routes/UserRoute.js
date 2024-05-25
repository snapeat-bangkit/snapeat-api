import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('User Page');
});

export default router;
