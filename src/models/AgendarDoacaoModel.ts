import { PrismaClient } from "@prisma/client";
import { Agendain } from "dtos/AgendarDoacaoDTO";

const prisma = new PrismaClient();

export default class AgendarDoacaoModel{

    create = async (agenda_doacao: Agendain ) => {

        return await prisma.agenda_doacao.create({
    
          data: {
            name:agenda_doacao.name,
            cpf:agenda_doacao.cpf,
            tel:agenda_doacao.tel,
            data:agenda_doacao.data,
            delivery:agenda_doacao.delivery,
            uf:agenda_doacao.uf,
            cidade:agenda_doacao.cidade,
            rua:agenda_doacao.rua,
            bairro:agenda_doacao.bairro,
            complemento:agenda_doacao.complemento,
            cep:agenda_doacao.cep,
            numero:agenda_doacao.numero,
            aprovado:false,
            ativo:true
          }
        });
      }
      getAll = async () => {
        return await prisma.agenda_doacao.findMany({
          where:{ativo:true,aprovado:false}
        });
      }
      getAllaceita = async () => {
        return await prisma.agenda_doacao.findMany({
          where:{ativo:true,aprovado:true}
        });
      }

      delete = async (id: number) => {
        return await prisma.agenda_doacao.update({
          where: {
            id:id
          },
          data:{
            ativo:false
          }
        })
      }

      reprovar = async (id: number) => {
        return await prisma.agenda_doacao.update({
          where: {
            id:id
          },
          data:{
            aprovado:false,
            ativo:false
          }
        })
      }

      aceitar = async (id: number) => {
        return await prisma.agenda_doacao.update({
          where: {
            id:id
          },
          data:{
            aprovado:true
          }
        })
      }


}