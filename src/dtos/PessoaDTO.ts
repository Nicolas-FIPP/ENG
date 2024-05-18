import { PessoaFisicaIn } from "./FisicaDTO";
import { PessoaJuridicaIn } from "./JuridicaDTO";

export interface pessoaIn {
  nome: string;
  tel: string;
  email: string;
  cidade: string;
  bairro?: string;
  cep: string;
  numero?: string;
  complemento?: string;
  uf:string;
  rua?: string;
  cpf?: string;
  cnpj?: string;
  pessoaFisica?: PessoaFisicaIn;
  pessoaJuridica?: PessoaJuridicaIn;
  
}


export interface pessoaOut {
  id: number;
  nome: string;
  tel: string;
  status: boolean;
  email: string;
  cidade: string;
  bairro?: string | null;
  cep: string;
  numero?: string | null;
  complemento?: string | null;
  rua?: string | null;
  uf:string;
}
