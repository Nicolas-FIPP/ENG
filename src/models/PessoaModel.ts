import { PrismaClient } from '@prisma/client';
import { pessoaIn } from 'dtos/PessoaDTO';

const prisma = new PrismaClient();

export default class PessoaModel {

  create = async (pessoa: pessoaIn ) => {
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

  ValidaEmail = (email:string)=>{
    let regex : RegExp = RegExp(/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    if(regex.test(email))
      return true;
    return false;

  }

  getAll = async () => {
    return await prisma.pessoa.findMany({
      include: {
        fisica: true,
        juridica: true,
        beneficio: true,
        doacao: true,
        evento: true,
        oficina: true
      }
    });
  }

  update = async (id: number, data: any) => {
    return await prisma.pessoa.update({
      where: { id: id },
      data: data
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
*/
  
  /*

  getAll = async () => {
    return await prisma.user.findMany();
  }

*/
  




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