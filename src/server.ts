import express, { NextFunction, Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';

import db from './config/database.config';
import { TodoInstance } from './model/index';
import TodoValidator from './validator'
import Middleware from './middleware'

db.sync().then(() => {
	console.log('connect to DB');
});

const app = express();
const port = 9000;

app.use(express.json());

app.post('/todo', TodoValidator.checkCreateTodo(), Middleware.handleValidationError, async (req: Request, res: Response) => {
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

app.get('/todo',TodoValidator.checkReadTodo(), Middleware.handleValidationError, async (req: Request, res: Response) => {
	try {

		const limit = req.query?.limit as number | undefined;
		const offset = req.query?.offset as number | undefined;

		
		const records = await TodoInstance.findAll({ where: {}, limit, offset })

		res.status(200).json(records)
	} catch (error) {
		return res.json({ msg: 'failed to read', route: '/todo' })
	}
})

app.listen(port, () => {
	console.log(`Server working port: ${port}`);
});
