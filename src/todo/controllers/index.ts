import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import TodoValidator from '../validator';
import { TodoInstance } from '../model/index';

class TodoController {
    // Create Todo
	async create(req: Request, res: Response) {
		const id = uuidv4();

		try {
			const record = await TodoInstance.create({ ...req.body, id });
			return res
				.status(201)
				.json({ record, msg: 'Succesfuly created todo' });
		} catch (error) {
			return res.status(500).json({
				msg: 'failed to create todo',
				route: '/create'
			});
		}
	}

    // Used for pagination
	async read(req: Request, res: Response) {
		try {
			const limit = req.query?.limit as number | undefined;
			const offset = req.query?.offset as number | undefined;

			const records = await TodoInstance.findAll({
				where: {},
				limit,
				offset
			});

			res.status(200).json(records);
		} catch (error) {
			res.json({ msg: 'failed to read', route: '/todo' });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const record = await TodoInstance.findOne({ where: { id } });

			res.status(200).json(record);
		} catch (error) {
			res.status(500).json({ msg: 'failed to read', route: '/todo/:id' });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const record = await TodoInstance.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: 'Can not find existing record' });
			}

			const updatedRecord = await record.update({
				completed: !record.getDataValue('completed')
			});

			res.status(200).json({ record: updatedRecord });
		} catch (error) {
			res
				.status(500)
				.json({ msg: 'failed to update', route: '/todo/:id' });
		}
	}
    async delete (req: Request, res: Response) {
		try {
			const { id } = req.params;

			const record = await TodoInstance.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: 'Can not find existing record' });
			}

			const deletedRecord = await record.destroy();

			res.status(200).json({ record: deletedRecord });
		} catch (error) {
			res
				.status(500)
				.json({ msg: 'failed to delete', route: '/todo/:id' });
		}
	}
}

export default new TodoController();