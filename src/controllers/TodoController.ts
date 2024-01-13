import { Request, Response } from 'express';

import TodoService from '../services/TodoService';

import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

import Logger from '../utils/logger';

class TodoController {
  static async create(req: Request, res: Response) {
    Logger.info('Creating a new todo');

    /* Get the IP from the request socket */
    const { remoteAddress } = req.socket;

    /* Get the title from the request body */
    const { title } = req.body;

    /* Construct the new todo object */
    const todoCreateObj = {
      title,
      is_done: false,
      created_at: new Date(),
      created_by: remoteAddress || '',
      updated_at: new Date(),
    }

    const createdTodo = await TodoService.create(todoCreateObj);

    Logger.info(`Created a new todo. ID: ${createdTodo.id}`)
    res.status(HTTPStatusEnum.CREATED).send({ message: 'Created', data: createdTodo });
  }

  static async patchStatusById(req: Request, res: Response) {
    /* Get the id from the request params */
    const { id } = req.params;

    /* Get the is_done from the request body */
    const { is_done } = req.body;

    Logger.info(`Updating a todo status. ID: ${id}`);

    const patchedTodo = await TodoService.patchStatusById(Number(id), is_done);

    Logger.info(`Updated a todo status. ID: ${patchedTodo.id}`)
    res.status(HTTPStatusEnum.OK).send({ message: 'Patched', data: patchedTodo });
  }

  static async updateById(req: Request, res: Response) {
    const updatedTodo = await TodoService.updateById(Number(req.params.id), req.body);
    res.status(HTTPStatusEnum.OK).send({ message: 'Updated', data: updatedTodo });
  }

  static async deleteById(req: Request, res: Response) {
    const deletedTodo = await TodoService.deleteById(Number(req.params.id));
    res.status(HTTPStatusEnum.OK).send({ message: 'Deleted', data: deletedTodo });
  }

  static async findAll(req: Request, res: Response) {
    Logger.info('Finding all todos');

    const todos = await TodoService.findAll();

    Logger.info(`Found all todos. Count: ${todos.length}`)
    res.status(HTTPStatusEnum.OK).send({ message: 'Success', data: todos });
  }
}

export default TodoController;
