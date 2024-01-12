import BaseRoutes from './base/BaseRouter';
// import NoteController from '../controller/NoteController';
// import validate from '../helper/validate';
// import { createNoteSchema, updateNoteSchema } from '../schema/NoteSchema';

class TodoRoutes extends BaseRoutes {
  public routes(): void {
    // this.router.post('/todo', validate(createNoteSchema), NoteController.create);
    // this.router.patch('/todos/:id', validate(updateNoteSchema), NoteController.update);
    // this.router.delete('/todos/:id', NoteController.delete);
    // this.router.get('/todos', NoteController.findAll);
    this.router.post('/todo');
    this.router.patch('/todos/:id');
    this.router.delete('/todos/:id');
    this.router.get('/todos', (req, res) => {
      res.send('Hello World!');
    });
  }
}

export default new TodoRoutes().router;
