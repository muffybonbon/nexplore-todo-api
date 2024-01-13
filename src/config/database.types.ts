import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface IDatabase {
  todo: ITodoTable;
}

export interface ITodoTable {
  id: Generated<number>;
  title: string;
  is_done: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
}

export type Todo = Selectable<ITodoTable>;
export type NewTodo = Insertable<ITodoTable>;
export type UpdateTodo = Updateable<ITodoTable>;
