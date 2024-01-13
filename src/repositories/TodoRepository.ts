import { db } from '../config/database';
import { NewTodo, UpdateTodo } from '../config/database.types';

export const findTodo = async () => {
  const query = db.selectFrom('todo');
  return await query.selectAll().execute();
};

export const createTodo = async (todo: NewTodo) => {
  return await db.insertInto('todo').values(todo).returning('id').executeTakeFirstOrThrow();
};

export const updateTodo = async (id: number, updateWith: UpdateTodo) => {
  return await db.updateTable('todo').set(updateWith).where('id', '=', id).returning('id').executeTakeFirstOrThrow();
};

export const deleteTodo = async (id: number) => {
  return await db.deleteFrom('todo').where('id', '=', id).returning('id').executeTakeFirstOrThrow();
};
