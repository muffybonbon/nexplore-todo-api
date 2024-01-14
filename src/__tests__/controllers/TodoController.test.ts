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
      const returnTodoCreateObj = { id: 1, title: 'Test Todo' };

      (TodoService.create as jest.Mock).mockResolvedValue(returnTodoCreateObj);

      await TodoController.create(req, res);

      expect(TodoService.create).toHaveBeenCalledWith(expectedTodoCreateObj);
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Creating a new todo'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Created a new todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.CREATED);
      expect(res.send).toHaveBeenCalledWith({ message: 'Created', data: returnTodoCreateObj });
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
      const returnTodoCreateObj = { id: 1, title: 'Test Todo' };

      (TodoService.create as jest.Mock).mockResolvedValue(returnTodoCreateObj);

      await TodoController.create(req, res);

      expect(TodoService.create).toHaveBeenCalledWith(expectedTodoCreateObj);
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Creating a new todo'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Created a new todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.CREATED);
      expect(res.send).toHaveBeenCalledWith({ message: 'Created', data: returnTodoCreateObj });
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
      const returnTodoPatchStatusObj = { id: 1, is_done: true };

      (TodoService.patchStatusById as jest.Mock).mockResolvedValue(returnTodoPatchStatusObj);

      await TodoController.patchStatusById(req, res);

      expect(TodoService.patchStatusById).toHaveBeenCalledWith(1, true, '127.0.0.1');
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updating a todo status'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updated a todo status. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Patched', data: returnTodoPatchStatusObj });
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
      const returnTodoPatchStatusObj = { id: 1, is_done: true };

      (TodoService.patchStatusById as jest.Mock).mockResolvedValue(returnTodoPatchStatusObj);

      await TodoController.patchStatusById(req, res);

      expect(TodoService.patchStatusById).toHaveBeenCalledWith(1, true, '');
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updating a todo status'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updated a todo status. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Patched', data: returnTodoPatchStatusObj });
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
      const returnTodoUpdateObj = { id: 1, title: 'Updated Todo', is_done: false };

      (TodoService.updateById as jest.Mock).mockResolvedValue(returnTodoUpdateObj);

      await TodoController.updateById(req, res);

      expect(TodoService.updateById).toHaveBeenCalledWith(1, expect.any(Object), '127.0.0.1');
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updating a todo'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updated a todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Updated', data: returnTodoUpdateObj });
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
      const returnTodoUpdateObj = { id: 1, title: 'Updated Todo', is_done: false };

      (TodoService.updateById as jest.Mock).mockResolvedValue(returnTodoUpdateObj);

      await TodoController.updateById(req, res);

      expect(TodoService.updateById).toHaveBeenCalledWith(1, expect.any(Object), '');
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updating a todo'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Updated a todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Updated', data: returnTodoUpdateObj });
    });
  });

  describe('deleteById', () => {
    it('should delete a todo and return the deleted todo id', async () => {
      const req = { params: { id: '1' }, socket: { remoteAddress: '127.0.0.1' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const returnTodoDeleteObj = { id: 1 };

      (TodoService.deleteById as jest.Mock).mockResolvedValue(returnTodoDeleteObj);

      await TodoController.deleteById(req, res);

      expect(TodoService.deleteById).toHaveBeenCalledWith(1);
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Deleting a todo. ID: 1'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Deleted a todo. ID: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Deleted', data: returnTodoDeleteObj });
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const req = {} as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const returnTodoFindAllObj = [{ id: 1, title: 'Test Todo' }];

      (TodoService.findAll as jest.Mock).mockResolvedValue(returnTodoFindAllObj);

      await TodoController.findAll(req, res);

      expect(TodoService.findAll).toHaveBeenCalled();
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Finding all todos'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Found all todos. Count: 1'));
      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.OK);
      expect(res.send).toHaveBeenCalledWith({ message: 'Success', data: returnTodoFindAllObj });
    });
  });
});
