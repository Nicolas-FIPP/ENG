import { Router } from 'express';
import  TipoOficinaController from 'controllers/TipoOficinaController';

const routes = Router();
const tipooficinaController = new TipoOficinaController();

routes.post('/cadastrar-tipo-oficina', tipooficinaController.create);
routes.get('/todos-tipos-oficinas', tipooficinaController.getAll);
routes.get('/get-oficina/:id', tipooficinaController.get);
routes.put('/altera-tipo-oficina/:id', tipooficinaController.update);
routes.delete('/deletar-tipo-oficina/:id', tipooficinaController.delete);

export default routes;