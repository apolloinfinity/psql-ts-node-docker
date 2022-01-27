import express from 'express';

import db from './config/database.config';

import todoRouter from './todo/router';

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
