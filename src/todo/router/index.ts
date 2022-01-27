import { Router } from 'express';

import TodoValidator from '../validator';
import Middleware from '../../middleware';
import TodoController from '../controllers';

const router = Router();

router.post(
	'/todo',
	TodoValidator.checkCreateTodo(),
	Middleware.handleValidationError,
	TodoController.create
);

router.get(
	'/todo',
	TodoValidator.checkReadTodo(),
	Middleware.handleValidationError,
	TodoController.read
);

router.get(
	'/todo/:id',
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.getById
);

router.put(
	'/todo/:id',
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.update
);

router.delete(
	'/todo/:id',
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.delete
);

export default router;
