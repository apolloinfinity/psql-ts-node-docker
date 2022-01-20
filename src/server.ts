import express, { Request, Response } from 'express';
import db from './config/database.config';

db.sync().then(() => {
	console.log('connect to DB');
});

const app = express();
const port = 9000;

app.get('/', (req: Request, res: Response) => {
	res.send('hello world');
});

app.listen(port, () => {
	console.log(`Server working port: ${port}`);
});
