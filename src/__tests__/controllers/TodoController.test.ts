import { Request, Response } from 'express';

import TodoController from '../../controllers/TodoController';

import TodoService from '../../services/TodoService';

import Logger from '../../utils/logger';

import { HTTPStatusEnum } from '../../enums/HTTPStatusEnum';

jest.mock('../../services/TodoService');
jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
}));

describe('TodoController', () => {
  describe('create', () => {
    it('should create a new todo and return it', async () => {
      const req = { body: { title: 'Test Todo' }, socket: { remoteAddress: '127.0.0.1' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const expectedTodoCreateObj = {
        title: 'Test Todo',
        is_done: false,
        created_at: new Date(),
        created_by: '127.0.0.1',
        updated_at: new Date(),
        updated_by: '127.0.0.1',
      };

      (TodoService.create as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Todo' });

      await TodoController.create(req, res);

      expect(TodoService.create).toHaveBeenCalledWith(expectedTodoCreateObj);
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Creating a new todo'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Created a new todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.CREATED);
      expect(res.send).toHaveBeenCalledWith({ message: 'Created', data: expect.anything() });
    });

    it('should use default remoteAddress when not provided', async () => {
      const req = { body: { title: 'Test Todo' }, socket: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const expectedTodoCreateObj = {
        title: 'Test Todo',
        is_done: false,
        created_at: new Date(),
        created_by: '',
        updated_at: new Date(),
        updated_by: '',
      };

      (TodoService.create as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Todo' });

      await TodoController.create(req, res);

      expect(TodoService.create).toHaveBeenCalledWith(expectedTodoCreateObj);
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.CREATED);
      expect(res.send).toHaveBeenCalledWith({ message: 'Created', data: expect.anything() });
    });
  });

  describe('patchStatusById', () => {
    it('should patch the status of a todo and return the updated todo', async () => {
      const req = {
        body: { is_done: true },
        params: { id: '1' },
        socket: { remoteAddress: '127.0.0.1' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.patchStatusById as jest.Mock).mockResolvedValue({ id: 1, is_done: true });

      await TodoController.patchStatusById(req, res);

      expect(TodoService.patchStatusById).toHaveBeenCalledWith(1, true, '127.0.0.1');
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Patched', data: expect.anything() });
    });

    it('should use default remoteAddress when not provided', async () => {
      const req = {
        body: { is_done: true },
        params: { id: '1' },
        socket: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.patchStatusById as jest.Mock).mockResolvedValue({ id: 1, is_done: true });

      await TodoController.patchStatusById(req, res);

      expect(TodoService.patchStatusById).toHaveBeenCalledWith(1, true, '');
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Patched', data: expect.anything() });
    });
  });

  describe('updateById', () => {
    it('should update a todo and return the updated todo', async () => {
      const req = {
        body: { title: 'Updated Todo', is_done: false },
        params: { id: '1' },
        socket: { remoteAddress: '127.0.0.1' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.updateById as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated Todo', is_done: false });

      await TodoController.updateById(req, res);

      expect(TodoService.updateById).toHaveBeenCalledWith(1, expect.any(Object), '127.0.0.1');
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Updated', data: expect.anything() });
    });

    it('should use default remoteAddress when not provided', async () => {
      const req = {
        body: { title: 'Updated Todo', is_done: false },
        params: { id: '1' },
        socket: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.updateById as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated Todo', is_done: false });

      await TodoController.updateById(req, res);

      expect(TodoService.updateById).toHaveBeenCalledWith(1, expect.any(Object), '');
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Updated', data: expect.anything() });
    });
  });

  describe('deleteById', () => {
    it('should delete a todo and return the deleted todo id', async () => {
      const req = { params: { id: '1' }, socket: { remoteAddress: '127.0.0.1' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.deleteById as jest.Mock).mockResolvedValue({ id: 1 });

      await TodoController.deleteById(req, res);

      expect(TodoService.deleteById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Deleted', data: expect.anything() });
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const req = {} as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (TodoService.findAll as jest.Mock).mockResolvedValue([{ id: 1, title: 'Test Todo' }]);

      await TodoController.findAll(req, res);

      expect(TodoService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Success', data: expect.anything() });
    });
  });
});
