import { findTodo, createTodo, deleteTodo, updateTodo } from '../repositories/TodoRepository';

import { NewTodo, UpdateTodo } from '../config/database.types';

class TodoService {
  static async findAll() {
    return await findTodo();
  }

  static async create(todo: NewTodo) {
    const newTodo: NewTodo = {
      ...todo,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return await createTodo(newTodo);
  }

  static async updateById(id: number, updateWith: UpdateTodo) {
    const updateTodoObj: UpdateTodo = {
      ...updateWith,
      updated_at: new Date(),
    };
    return await updateTodo(id, updateTodoObj);
  }

  static async patchStatusById(id: number, isDone: boolean) {
    const updateTodoObj: UpdateTodo = {
      is_done: isDone,
      updated_at: new Date(),
    };
    return await updateTodo(id, updateTodoObj);
  }

  static async deleteById(id: number) {
    return await deleteTodo(id);
  }
}

export default TodoService;
