import { DateTime } from "luxon"

export interface EventoIn {
    nome: string;
    custo: number;
    dt_ini: Date;
    dt_fim: Date;
    uf: string;
    cidade: string
    rua?: string;
    bairro?: string;
    complemento?: string;
    cep: string;
    numero?: string;
    pes_id_responsavel: number;
  }


export interface EventoOut {
  id: number;
  nome: string;
  custo: number;
  dt_ini: Date;
  dt_fim: Date;
  uf: string;
  cidade: string
  rua?: string | null;
  bairro?: string | null;
  complemento?: string | null;
  cep: string;
  numero?: string | null;
  //pes_id_responsavel: number | null;
  pessoa?: {
    id: number;
    nome: string;
  } | null;
}