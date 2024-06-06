import { PessoaJuridicaIn } from './JuridicaDTO';

export interface ParametrizacaoDTO {
    pes_id: number; 
    par_logo_grande?: string;
    par_logo_pequeno?: string;
    juridica?: PessoaJuridicaIn; 
}