'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './src/config.js';

import userRouter from './src/routes/UserRoute.js';
import postRouter from './src/routes/PostRoute.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(config.port, () =>
  console.log('App is listening on url http://localhost:' + config.port)
);
