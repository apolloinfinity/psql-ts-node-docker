import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false
});

export default db;
