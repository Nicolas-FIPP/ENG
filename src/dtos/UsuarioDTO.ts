import { DateTime } from "luxon";

export interface UsuarioIn{
    senha: string;
    nivel_acesso: number;
    pes_id: number;
}

export interface UsuarioOut{
    id: number;
    nivel_acesso: number;
    status: boolean;
    criado_em: Date
    pes_id: number
} 