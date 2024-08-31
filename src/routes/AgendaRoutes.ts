import AgendarDoacaoController from "controllers/AgendarDoacaoController";
import { Router } from "express"


const routes = Router();
const agendarDoacaoController = new AgendarDoacaoController();

routes.post('/cadastrar',agendarDoacaoController.create);
routes.get('/',agendarDoacaoController.getAll);
routes.get('/aceita',agendarDoacaoController.getAllaceita);
routes.put('/aprovar/:id',agendarDoacaoController.aprovar);
routes.put('/recusar/:id',agendarDoacaoController.recusar);
routes.post('/sms',agendarDoacaoController.enviarsms);

export default routes;