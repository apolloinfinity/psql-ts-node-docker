import { body, query } from 'express-validator';

class TodoValidator {
	checkCreateTodo() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The value should be UUID 4'),
			body('title').notEmpty().withMessage('Title should not be empty'),
			body('completed')
				.optional()
				.isBoolean()
				.withMessage('The value should be a boolean')
				.isIn([ 0, false ])
				.withMessage('The value should be 0 or false')
		];
	}
	checkReadTodo() {
		return [
			query('limit')
				.notEmpty()
				.withMessage('The query limit should not be empty')
				.isInt({ min: 1, max: 10 })
				.withMessage(
					'The limit value should be an integer and between 1-10'
				),
			query('offset')
				.optional()
				.isNumeric()
				.withMessage('Should be a number')
		];
	}
}

export default new TodoValidator();
