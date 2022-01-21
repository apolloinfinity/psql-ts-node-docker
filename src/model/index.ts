import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config';

interface ITodo {
	id: string;
	title: string;
	completed: boolean;
}

class TodoInstance extends Model<ITodo> {}

TodoInstance.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		sequelize: db,
		tableName: 'todos'
	}
);