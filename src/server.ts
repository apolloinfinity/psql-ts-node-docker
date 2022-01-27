import app from './app';

import db from './config/database.config';

db.sync().then(() => {
	console.log('connect to DB');
});

const port = 9000;

app.listen(port, () => {
	console.log(`Server working port: ${port}`);
});

export default app;
