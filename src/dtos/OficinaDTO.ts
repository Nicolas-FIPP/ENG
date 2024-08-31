import { TipoOficinaOut } from "dtos/TipoOficinaDTO"
import { MatriculaDTO, MatriculaNomeDTO } from "./Oficina/matriculaDTO"

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
          
  
  }

  export interface  OficinaeMatriculados{
    disciplina: string
    matriculados: MatriculaNomeDTO[]  
  }