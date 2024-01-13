import BaseRoutes from './base/BaseRouter';
import TodoController from '../controllers/TodoController';
// import validate from '../helper/validate';

import { asyncHandler } from '../middlewares/controllerMiddleware';

class TodoRoutes extends BaseRoutes {
  public routes(): void {
    // this.router.post('/todo', validate(createNoteSchema), NoteController.create);
    // this.router.patch('/todos/:id', validate(updateNoteSchema), NoteController.update);
    // this.router.delete('/todos/:id', NoteController.delete);
    // this.router.get('/todos', NoteController.findAll);
    this.router.post('/todos', asyncHandler(TodoController.create));
    this.router.put('/todos/:id', asyncHandler(TodoController.updateById));
    this.router.patch('/todos/:id/status', asyncHandler(TodoController.updateById));
    this.router.delete('/todos/:id', asyncHandler(TodoController.deleteById));
    this.router.get('/todos', asyncHandler(TodoController.findAll));
  }
}

export default new TodoRoutes().router;
