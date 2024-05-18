
export interface FisicaIn {
    pes_id: number;
    pesfis_cpf: string;
    pesfis_dtnasc: Date | null;
    pesfis_sexo: string;
    pesfis_rg: string;
  }

  export interface FisicaOut {
    pes_id: number;
    pesfis_cpf: string;
    pesfis_dtnasc: Date | null;
    pesfis_sexo: string;
    pesfis_rg: string;
  }