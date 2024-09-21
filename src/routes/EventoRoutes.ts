import EventoControl from 'controllers/EventoControl';
import { Router } from 'express';

const routes = Router();
const eventoController = new EventoControl();

routes.post('/cadastrar', eventoController.create);
routes.get('/', eventoController.getAll);
routes.put('/update/:id', eventoController.update);
routes.delete('/delete/:id', eventoController.delete);

export default routes;
