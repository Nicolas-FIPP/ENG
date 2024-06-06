import { PessoaJuridicaIn } from './JuridicaDTO';

export interface ParametrizacaoDTO {
    pes_id: number;
    par_logo_grande?: string;
    par_logo_pequeno?: string;
    nome: string;
    cnpj: string;
    area_atuacao: string;
    endereco: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    telefone: string;
    email: string;
  }
  