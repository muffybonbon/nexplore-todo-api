import { Request, Response } from 'express';

import TodoService from '../services/TodoService';

import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

import Logger from '../utils/logger';

class TodoController {
  static async create(req: Request, res: Response) {
    const createdTodo = await TodoService.create(req.body);
    res.status(HTTPStatusEnum.CREATED).send({ message: 'Created', data: createdTodo });
  }

  static async findAll(req: Request, res: Response) {
    const todos = await TodoService.findAll();
    res.status(HTTPStatusEnum.OK).send({ message: 'Success', data: todos });
  }

  static async updateById(req: Request, res: Response) {
    const updatedTodo = await TodoService.updateById(Number(req.params.id), req.body);
    res.status(HTTPStatusEnum.OK).send({ message: 'Updated', data: updatedTodo });
  }

  static async deleteById(req: Request, res: Response) {
    const deletedTodo = await TodoService.deleteById(Number(req.params.id));
    res.status(HTTPStatusEnum.OK).send({ message: 'Deleted', data: deletedTodo });
  }
}

export default TodoController;
