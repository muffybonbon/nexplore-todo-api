import { check } from 'express-validator';

import BaseRoutes from './base/BaseRouter';
import TodoController from '../controllers/TodoController';

import { checkValidation } from '../middlewares/validationMiddleware';
import { asyncHandler } from '../middlewares/controllerMiddleware';

class TodoRoutes extends BaseRoutes {
  public routes(): void {
    /* Create a TODO */
    this.router.post(
      '/todos',
      [check('title').isString().notEmpty()],
      checkValidation,
      asyncHandler(TodoController.create)
    );

    /* Update a TODO */
    this.router.put(
      '/todos/:id',
      [check('id').isNumeric().notEmpty(), check('title').isString().notEmpty(), check('is_done').isBoolean()],
      checkValidation,
      asyncHandler(TodoController.updateById)
    );

    /* Update a TODO status */
    this.router.patch(
      '/todos/:id/status',
      [check('id').isNumeric().notEmpty(), check('is_done').isBoolean()],
      checkValidation,
      asyncHandler(TodoController.patchStatusById)
    );

    /* Delete a TODO */
    this.router.delete(
      '/todos/:id',
      [check('id').isNumeric().notEmpty()],
      checkValidation,
      asyncHandler(TodoController.deleteById)
    );

    /* Get all TODOs */
    this.router.get('/todos', [], checkValidation, asyncHandler(TodoController.findAll));
  }
}

export default new TodoRoutes().router;
