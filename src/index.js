import express from 'express';
import bodyParser from 'body-parser';
import db from './connection.js';
import dotenv from 'dotenv';

import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use('/user', UserRoute);
app.use('/posts', PostRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});
