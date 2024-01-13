import * as TodoRepository from '../../repositories/TodoRepository';
import { db } from '../../config/database';

import { todoOne } from '../__data__/todo'; 

jest.mock('../../config/database', () => ({
  db: {
    selectFrom: jest.fn() as jest.Mock,
    insertInto: jest.fn() as jest.Mock,
    updateTable: jest.fn() as jest.Mock,
    deleteFrom: jest.fn() as jest.Mock,
  },
}));

const mockQueryChain = {
  selectAll: jest.fn().mockReturnThis(),
  execute: jest.fn(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  executeTakeFirstOrThrow: jest.fn(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
};

(db.selectFrom as jest.Mock).mockImplementation(() => mockQueryChain);
(db.insertInto as jest.Mock).mockImplementation(() => mockQueryChain);
(db.updateTable as jest.Mock).mockImplementation(() => mockQueryChain);
(db.deleteFrom as jest.Mock).mockImplementation(() => mockQueryChain);

describe('TodoRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findTodo', () => {
    it('should query all todos', async () => {
      mockQueryChain.execute.mockResolvedValueOnce(['todo1', 'todo2']);

      const result = await TodoRepository.findTodo();

      expect(db.selectFrom).toHaveBeenCalledWith('todo');
      expect(mockQueryChain.selectAll).toHaveBeenCalled();
      expect(mockQueryChain.execute).toHaveBeenCalled();
      expect(result).toEqual(['todo1', 'todo2']);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      mockQueryChain.executeTakeFirstOrThrow.mockResolvedValueOnce({ id: 1 });

      const result = await TodoRepository.createTodo(todoOne);

      expect(db.insertInto).toHaveBeenCalledWith('todo');
      expect(mockQueryChain.values).toHaveBeenCalledWith(todoOne);
      expect(mockQueryChain.returning).toHaveBeenCalledWith('id');
      expect(mockQueryChain.executeTakeFirstOrThrow).toHaveBeenCalled();
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('updateTodo', () => {
    it('should update a todo by id', async () => {
      const todoId = 1;
      mockQueryChain.executeTakeFirstOrThrow.mockResolvedValueOnce({ id: todoId });
  
      const result = await TodoRepository.updateTodo(todoId, todoOne);
  
      expect(db.updateTable).toHaveBeenCalledWith('todo');
      expect(mockQueryChain.set).toHaveBeenCalledWith(todoOne);
      expect(mockQueryChain.where).toHaveBeenCalledWith('id', '=', todoId);
      expect(mockQueryChain.returning).toHaveBeenCalledWith('id');
      expect(mockQueryChain.executeTakeFirstOrThrow).toHaveBeenCalled();
      expect(result).toEqual({ id: todoId });
    });
  });
  
  describe('deleteTodo', () => {
    it('should delete a todo by id', async () => {
      const todoId = 1;
      mockQueryChain.executeTakeFirstOrThrow.mockResolvedValueOnce({ id: todoId });
  
      const result = await TodoRepository.deleteTodo(todoId);
  
      expect(db.deleteFrom).toHaveBeenCalledWith('todo');
      expect(mockQueryChain.where).toHaveBeenCalledWith('id', '=', todoId);
      expect(mockQueryChain.returning).toHaveBeenCalledWith('id');
      expect(mockQueryChain.executeTakeFirstOrThrow).toHaveBeenCalled();
      expect(result).toEqual({ id: todoId });
    });
  });
});