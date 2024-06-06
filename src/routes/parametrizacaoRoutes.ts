import { Router } from 'express';
import ParametrizacaoController from 'controllers/ParametrizacaoController';

const routes = Router();
const parametrizacaoController = new ParametrizacaoController();

routes.post('/cadastrar-parametro', parametrizacaoController.create);
routes.get('/get-parametro/:id', parametrizacaoController.get);
routes.put('/altera-parametro/:id', parametrizacaoController.update);
routes.delete('/deletar-parametro/:id', parametrizacaoController.delete);

export default routes;