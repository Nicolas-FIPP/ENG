import { Router } from 'express';
import PessoaInteressadaControl from '../controllers/pessoa-interessada-control';

const pessoaInteressadaControl = new PessoaInteressadaControl();

const routes = Router();

// Criar pessoa interessada
routes.post('/', pessoaInteressadaControl.add);

// Deletar pessoa interessada por email
routes.delete('/', pessoaInteressadaControl.remove);

export default routes;
