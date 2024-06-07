import { Router } from 'express';
import ParametrizacaoController from 'controllers/ParametrizacaoController';

const routes = Router();
const parametrizacaoController = new ParametrizacaoController();

routes.post('/cadastrar-parametro', parametrizacaoController.create);
routes.get('/get-parametro', parametrizacaoController.get);
routes.put('/altera-parametro', parametrizacaoController.update);

export default routes;
