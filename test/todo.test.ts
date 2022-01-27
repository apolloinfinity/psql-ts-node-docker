import request from 'supertest';
import app from '../src/app';
import { TodoInstance } from '../src/todo/model';

describe('test create route', () => {
	const todo = {
		title: 'Create Todo'
	};

	test('Should have key record and message when succesful', async () => {
		const mockCreateTodos = jest.fn((): any => todo);
		jest
			.spyOn(TodoInstance, 'create')
			.mockImplementation(() => mockCreateTodos());

		const res = await request(app).post('/api/v1/todo').send(todo);
		expect(mockCreateTodos).toHaveBeenCalledTimes(1);
		expect(res.body).toHaveProperty('record');
		expect(res.body).toHaveProperty('msg');
	});

	test('Should handle exception errors', async () => {
		const mockCreateTodos = jest.fn((): any => {
			throw 'error';
		});
		jest
			.spyOn(TodoInstance, 'create')
			.mockImplementation(() => mockCreateTodos());

		const res = await request(app).post('/api/v1/todo').send(todo);
		expect(mockCreateTodos).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual({
			msg: 'failed to create todo',
			route: '/todo'
		});
	});

	test('Should handle request params', async () => {
		const res = await request(app).post('/api/v1/todo').send({});

		expect(res.body).toEqual({
			msg: 'Title should not be empty',
			param: 'title',
			location: 'body'
		});
	});
});

describe('test pagination route', () => {
	const todo = {
		title: 'Create Todo'
	};

	test('Should return an array of todos', async () => {
		const mockReadTodos = jest.fn((): any => [ todo ]);
		jest
			.spyOn(TodoInstance, 'findAll')
			.mockImplementation(() => mockReadTodos());

		const res = await request(app).get('/api/v1/todo?limit=5');
		expect(mockReadTodos).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual([ todo ]);
	});

	test('Should handle exception errors', async () => {
		const mockReadTodos = jest.fn((): any => {
			throw 'error';
		});
		jest
			.spyOn(TodoInstance, 'findAll')
			.mockImplementation(() => mockReadTodos());

		const res = await request(app).get('/api/v1/todo?limit=5');

		expect(mockReadTodos).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual({ msg: 'failed to read', route: '/todo' });
	});

	test('Should handle request query', async () => {
		const res = await request(app).get('/api/v1/todo');

		expect(res.body).toEqual({
			msg: 'The query limit should not be empty',
			param: 'limit',
			location: 'query'
		});
	});
});
