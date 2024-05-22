export interface PessoaIn {
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
  pessoaFisica?: PessoaFisica;
  pessoaJuridica?: PessoaJurdica;
  
}

export interface PessoaFisica{
  pes_id: number;
  cpf: string;
  dt_nasc: Date;
  sexo: string;
  rg: string;
}

export interface PessoaJurdica{
  pes_id: number;
  cnpj: string;
  insc_estadual: string;
  site?: string | null;
  razao_social: string;
}



export interface PessoaOut {
  id: number;
  nome: string;
  tel: string;
  email: string;
  cidade: string;
  bairro: string | null;
  cep: string;
  numero: string | null;
  complemento: string | null;
  rua: string | null;
  uf:string;
}
