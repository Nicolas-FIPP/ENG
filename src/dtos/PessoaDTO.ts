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
  pessoaJuridica?: PessoaJurdicaIn;
  
}

export interface PessoaFisicaIn{
  id: number;
  cpf: string;
  dt_nasc: Date;
  sexo: string;
  rg: string;
}

export interface PessoaJurdicaIn{
  id: number;
  cnpj: string;
  insc_estadual: string;
  site: string;
  razao_social: string;
}

export interface pessoaOut {
  id: number;
  nome: string;
  tel: string;
  status: number;
  email: string;
  estado: string;
  cidade: string;
  bairro: string;
  cep: string;
  numero: string;
  complemento: string;
  rua: string;
  uf:string;
}
