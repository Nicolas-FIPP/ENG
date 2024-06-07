import EventoControl from "controllers/EventoControl";
import { Router } from "express"


const routes = Router();
const eventoController = new EventoControl();

routes.post('/cadastrar',eventoController.create);
//routes.get('/',eventoController.getAll);
//routes.put('/update',eventoController.update);
//routes.put('/delete',eventoController.delete);

export default routes;