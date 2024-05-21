import OficinaController from "controllers/OficinaControl";

import { Router } from "express";
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();
const oficinaControl = new OficinaController();

routes.post('/cadastrar-oficina', oficinaControl.create);
routes.get('/listar-todos-oficina', oficinaControl.getAll);
routes.put('/alterar-oficina', autenticacaoToken, );
routes.delete('/excluir-oficina', autenticacaoToken, )

export default routes;