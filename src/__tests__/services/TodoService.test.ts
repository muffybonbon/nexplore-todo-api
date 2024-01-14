import TodoService from '../../services/TodoService';
import * as TodoRepository from '../../repositories/TodoRepository';
import { BadRequestError } from '../../utils/CustomErrors';
import { todoOne } from '../__data__/todo';

jest.mock('../../repositories/TodoRepository');

describe('TodoService', () => {
  const mockedFindTodo = TodoRepository.findTodo as jest.MockedFunction<typeof TodoRepository.findTodo>;
  const mockedCreateTodo = TodoRepository.createTodo as jest.MockedFunction<typeof TodoRepository.createTodo>;
  const mockedUpdateTodo = TodoRepository.updateTodo as jest.MockedFunction<typeof TodoRepository.updateTodo>;
  const mockedDeleteTodo = TodoRepository.deleteTodo as jest.MockedFunction<typeof TodoRepository.deleteTodo>;

  describe('findAll', () => {
    it('should return all todos', async () => {
      mockedFindTodo.mockResolvedValue([todoOne]);

      const result = await TodoService.findAll();

      expect(result).toEqual([todoOne]);
      expect(mockedFindTodo).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      mockedCreateTodo.mockResolvedValue(todoOne);

      const result = await TodoService.create(todoOne);

      expect(result).toEqual(todoOne);
      expect(mockedCreateTodo).toHaveBeenCalledWith(expect.objectContaining({ ...todoOne }));
    });
  });

  describe('updateById', () => {
    it('should update a todo by id', async () => {
      mockedUpdateTodo.mockResolvedValue(todoOne);

      const result = await TodoService.updateById(1, todoOne, 'user1');

      expect(result).toEqual(todoOne);
      expect(mockedUpdateTodo).toHaveBeenCalledWith(1, expect.objectContaining({ ...todoOne }));
    });

    it('should throw BadRequestError if updated_by is not provided', async () => {
      await expect(TodoService.updateById(1, { title: 'Updated Todo' }, '')).rejects.toThrow(BadRequestError);
    });
  });

  describe('patchStatusById', () => {
    it('should update the status of a todo by id', async () => {
      mockedUpdateTodo.mockResolvedValue(todoOne);

      const result = await TodoService.patchStatusById(1, true, 'user1');

      expect(result).toEqual(todoOne);
      expect(mockedUpdateTodo).toHaveBeenCalledWith(1, expect.objectContaining({ is_done: true }));
    });

    it('should throw BadRequestError if updated_by is not provided', async () => {
      await expect(TodoService.patchStatusById(1, true, '')).rejects.toThrow(BadRequestError);
    });
  });

  describe('deleteById', () => {
    it('should delete a todo by id', async () => {
      mockedDeleteTodo.mockResolvedValue({ id: 1 });

      const result = await TodoService.deleteById(1);

      expect(result).toEqual({ id: 1 });
      expect(mockedDeleteTodo).toHaveBeenCalledWith(1);
    });
  });
});
