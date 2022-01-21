import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import db from './config/database.config';
import { TodoInstance } from './model/index';
import TodoValidator from './validator'

db.sync().then(() => {
	console.log('connect to DB');
});

const app = express();
const port = 9000;

app.use(express.json());

app.post('/create', TodoValidator.checkCreateTodo(),(req:Request, res: Response, next: NextFunction) =>{
	const error = validationResult(req)
	if(!error.isEmpty()){
		return res.json(error)
	}

	next();
}, async (req: Request, res: Response) => {
	const id = uuidv4();

	try {
		const record = await TodoInstance.create({ ...req.body, id });
		res.status(201).json({ record, msg: 'Succesfuly created todo' });
	} catch (error) {
		res.status(500).json({
			msg: 'failed to create todo',
			
			route: '/create'
		});
	}
});

app.listen(port, () => {
	console.log(`Server working port: ${port}`);
});
