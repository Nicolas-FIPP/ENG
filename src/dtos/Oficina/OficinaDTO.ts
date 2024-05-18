import { TipoOficinaOut } from "dtos/TipoOficinaDTO"

export interface OficinaIn{
  id: number                   
  limite: number               
  disciplina: string           
  sala  : number               
  dt_ini : Date                
  dt_fim : Date               
  dias_funcionamento: string  
  criado_em: Date            
  pes_id:number                
  tof_id :number
  pessoa: pessoaOut
  tipo_oficina: TipoOficinaOut                

}


export interface OficinaOut{
    id: number                   
    limite: number               
    disciplina: string           
    sala  : number               
    dt_ini : Date                
    dt_fim : Date               
    dias_funcionamento: string  
    criado_em: Date            
    pessoa: pessoaOut
    tipo_oficina: TipoOficinaOut                
  
  }