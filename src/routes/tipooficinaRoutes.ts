import { Router } from 'express';
import  TipoOficinaController from 'controllers/TipoOficinaController';

const routes = Router();
const tipooficinaController = new TipoOficinaController();

routes.post('/', tipooficinaController.create);
/*routes.get('/', tipooficinaController.getAll);
routes.get('/:id', tipooficinaController.get);
routes.put('/:id', tipooficinaController.update);
routes.delete('/:id', tipooficinaController.delete);*/

export default routes;