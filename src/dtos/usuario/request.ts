import { z } from 'zod';

enum AccessLevels {
  admin = 1,
  user = 2,
}

const createUserBodyRequest = z.object({
  senha: z.string(),
  nivel_acesso: z.nativeEnum(AccessLevels),
  cpf: z.string().length(11),
});

const loginUsuarioRequest = z.object({
  cpf: z.string().length(11),
  senha: z.string(),
});

export { createUserBodyRequest, loginUsuarioRequest };
