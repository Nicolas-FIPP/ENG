import OficinaController from "controllers/OficinaControl";

import { Router } from "express";
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();
const oficinaControl = new OficinaController();

routes.post('/cadastrar-oficina', oficinaControl.create);

routes.post('/cadatrar-matriculado-oficina', oficinaControl.cadastroMatriculado);
routes.get('/listar-todos-oficina', oficinaControl.getAll);
routes.get('/:id', oficinaControl.get);
routes.put('/alterar-oficina/:id', oficinaControl.update, );
routes.delete('/excluir-matricula/:id', oficinaControl.deletarmatricula, )
routes.delete('/excluir-oficina/:id', oficinaControl.delete, )
routes.post('/listar-tudo',oficinaControl.mostrarMatriculascomoficinas)

export default routes;