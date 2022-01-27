import express, { NextFunction, Request, Response } from 'express';

import db from './config/database.config';
import { TodoInstance } from './model/index';
import TodoValidator from './validator';
import Middleware from './middleware';
import TodoController from './controllers';

import todoRouter from './router';

db.sync().then(() => {
	console.log('connect to DB');
});

const app = express();
const port = 9000;

app.use(express.json());
app.use('/', todoRouter);

app.listen(port, () => {
	console.log(`Server working port: ${port}`);
});
