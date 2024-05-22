import { PrismaClient } from '@prisma/client';
import { PessoaFisica, PessoaJurdica, PessoaIn } from 'dtos/PessoaDTO';

const prisma = new PrismaClient();

export default class PessoaModel {

  create = async (pessoa: PessoaIn ) => {
    return await prisma.pessoa.create({

      data: {
        nome: pessoa.nome,
        tel: pessoa.tel,
        email:pessoa.email,
        cidade: pessoa.cidade,
        bairro: pessoa.bairro,
        cep: pessoa.cep,
        numero: pessoa.numero,
        complemento: pessoa.complemento,
        rua : pessoa.rua,
        uf:pessoa.uf

      }
    });
  }

  createPessoaFisica = async (pessoa: PessoaFisica) => {
    return await prisma.fisica.create({
      data:{
        pes_id: pessoa.pes_id,
        cpf: pessoa.cpf,
        dt_nasc: pessoa.dt_nasc,
        sexo : pessoa.sexo,
        rg: pessoa.rg

      }
    });
  }

  createPessoaJuridica = async (pessoa: PessoaJurdica)=>{
    return await prisma.juridica.create({
      data:{
        pes_id: pessoa.pes_id,
        cnpj: pessoa.cnpj,
        insc_estadual: pessoa.insc_estadual,
        site: pessoa.site,
        razao_social: pessoa.razao_social
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

  getById = async (id: number) => {
    return await prisma.pessoa.findUnique({
      where: {
        id
      }
    });
  }
  /*

  get = async (id: number) => {
    return await prisma.pessoa.findUnique({
      where: {
        id
      }
    });
  }

  delete = async (id: number) => {
    return await prisma.pessoa.delete({
      where: {
        id
      }
    })
  }

  update = async (id: number, user: UserIn) => {
    return await prisma.user.update({
      where: {
        id
      },
      data: {
        ...user
      }
    })
  }*/


};