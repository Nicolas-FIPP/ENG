import { z } from 'zod';
import { AccessLevels } from './usuario.dto';

const createUserBodyRequest = z.object({
  senha: z.string(),
  nivel_acesso: z.nativeEnum(AccessLevels),
  cpf: z.string().length(11),
});

const loginUsuarioRequest = z.object({
  cpf: z.string().length(11),
  senha: z.string(),
});

const alterarSenhaUsuarioRequest = z.object({
  id: z.number(),
  nova_senha: z.string(),
});

export { alterarSenhaUsuarioRequest, createUserBodyRequest, loginUsuarioRequest };
