export interface UsuarioCreateBody {
  senha: string;
  nivel_acesso: number;
  cpf: string;
  criado_em?: string;
  pes_id?: number;
}

export interface UsuarioLoginBody {
  cpf: string;
  senha: string;
}

export enum AccessLevels {
  admin = 1,
  user = 2,
}
