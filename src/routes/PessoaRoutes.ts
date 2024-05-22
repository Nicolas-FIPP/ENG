import PessoaController from "controllers/PessoaController";
import { Router } from "express"


const routes = Router();

const pessoaController = new PessoaController();


routes.post('/cadastrar',pessoaController.create);
routes.get('/',pessoaController.getAll);
routes.put('/update',pessoaController.update);
routes.put('/delete',pessoaController.delete);


export default routes;