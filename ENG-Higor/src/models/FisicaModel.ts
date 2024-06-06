import { PrismaClient } from "@prisma/client"
import { PessoaFisicaIn } from "dtos/FisicaDTO";


const prisma = new PrismaClient();

export default class FisicaModel{


    createPessoaFisica = async (pessoa: PessoaFisicaIn) => {
            return await prisma.fisica.create({
                data:{
                  pes_id: pessoa.id ,
                  cpf: pessoa.cpf,
                  dt_nasc: pessoa.dt_nasc,
                  sexo : pessoa.sexo,
                  rg: pessoa.rg
          
                }
              });
        

      }

      restCPF(rest : number, sum : number){
        let digit : number;
        rest = sum%11;
        if(rest == 1 || rest == 0){
          digit = 0;
        }
        else{
          digit = 11 - rest;
        }
      
        return digit;
      }
        
      sumCPF(cpf: string, sum : number, sizeSum : number, multSum : number){
        sum = 0;
        for(let i = 0; i < sizeSum; i++){
          sum += (parseInt(cpf[i]) * (multSum-i));
        }
        return sum;
      }
        
    
      validaCpf = (cpf: string)=>{
    
        let regex : RegExp = RegExp(/^[0-9]{11}$/);
    
        if(regex.test(cpf)){
          let check = false;
          for(let i = 0; i < 10; i++){
            if(cpf[i+1] != cpf[i]){
              check = true;
            }
          }
          
          if(check){
            let sum : number = 0;
            let rest : number = 0;
            let firstDigit : number;
            let secondDigit : number;
        
        
            sum = this.sumCPF(cpf, sum, 9, 10);
            firstDigit = this.restCPF(rest, sum);
        
            sum = this.sumCPF(cpf, sum, 10, 11);
            secondDigit = this.restCPF(rest, sum);
        
            if(firstDigit != parseInt(cpf[9]) || secondDigit != parseInt(cpf[10])){
              return false;
            }
            return true;
          }
          else{
            return false; 
          }
        }
      }

      getAll = async () => {
        return await prisma.fisica.findMany();
      }
      
    /*
      get = async (id: number) => {
        return await prisma.fisica.findUnique({
          where: {
            id
          }
        });
      }
    
      delete = async (id: number) => {
        return await prisma.fisica.delete({
          where: {
            id
          }
        })
      }*/
    
      update = async (id: number, pessoa: PessoaFisicaIn) => {
        return await prisma.fisica.update({
          where: { pes_id:id},
          data: {
            cpf: pessoa.cpf,
            dt_nasc: pessoa.dt_nasc,
            sexo : pessoa.sexo,
            rg: pessoa.rg
          }
        })
      }
  
    
      /*
    getById = async (id: number) => {
        return await prisma.usuario.findUnique({
            where:{
                id
            }
        })
    };

    getByCpf = async (cpf: string) => {
        return await prisma.fisica.findUnique({
          where: {
            cpf: cpf,
          },
          include: {
            usuario: true,
          },
        });
    };
    */

}
