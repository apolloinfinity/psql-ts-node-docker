import { body } from 'express-validator';

class TodoValidator {
	checkCreateTodo() {
		return [
            body('id').optional().isUUID(4).withMessage("The value should be UUID 4"),
			body('title').notEmpty().withMessage('Title should not be empty'),
            body('completed').optional().isBoolean().withMessage('The value should be a boolean').isIn([0,false]).withMessage('The value should be 0 or false')
		];
	}
}

export default new TodoValidator();
