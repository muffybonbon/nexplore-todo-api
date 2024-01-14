import request from 'supertest';

import App from '../../app';

import { todoOne } from '../__data__/todo';

describe('TodoRoutes Integration Tests', () => {
  const server = new App().app;

  /* Test Suite Data */
  const newTodo = JSON.parse(JSON.stringify(todoOne));
  let createdTodoId: number;
  const updatedTitle = 'Updated Todo';

  describe('POST /api/v1/todos', () => {
    it('should create a new todo', async () => {
      const response = await request(server).post('/api/v1/todos').send({ title: newTodo.title });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.message).toEqual('Created');
      createdTodoId = response.body.data.id;
    });

    it('should return validation error for invalid data', async () => {
      const response = await request(server).post('/api/v1/todos').send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('body.title - Invalid value');
    });
  });

  describe('PATCH /api/v1/todos/:id/status', () => {
    it('should update the status of a todo', async () => {
      const response = await request(server).patch(`/api/v1/todos/${createdTodoId}/status`).send({ is_done: true });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toEqual(createdTodoId);
      expect(response.body.message).toEqual('Patched');
    });

    it('should return validation error for invalid id or status', async () => {
      const response = await request(server).patch('/api/v1/todos/abc/status').send({ is_done: true });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('params.id - Invalid value');
    });
  });

  describe('PUT /api/v1/todos/:id', () => {
    it('should update a todo', async () => {
      const response = await request(server)
        .put(`/api/v1/todos/${createdTodoId}`)
        .send({ title: updatedTitle, is_done: false });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toEqual(createdTodoId);
      expect(response.body.message).toEqual('Updated');
    });

    it('should return validation error for invalid data', async () => {
      const response = await request(server).put('/api/v1/todos/abc').send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'params.id - Invalid value; body.title - Invalid value; body.is_done - Invalid value'
      );
    });
  });

  describe('GET /api/v1/todos', () => {
    it('should return all todos', async () => {
      const response = await request(server).get('/api/v1/todos');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toEqual(1);
      expect(response.body.data[0].id).toEqual(createdTodoId);
      expect(response.body.data[0].title).toEqual(updatedTitle);
      expect(response.body.data[0].is_done).toEqual(false);
    });
  });

  describe('DELETE /api/v1/todos/:id', () => {
    it('should delete a todo', async () => {
      const response = await request(server).delete(`/api/v1/todos/${createdTodoId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Deleted');
    });

    it('should return validation error for invalid id', async () => {
      const response = await request(server).delete('/api/v1/todos/abc');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('params.id - Invalid value');
    });
  });
});
