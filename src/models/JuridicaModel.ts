import { PrismaClient } from "@prisma/client"
import { PessoaJurdicaIn } from "dtos/JuridicaDTO";


const prisma = new PrismaClient();

export default class FisicaModel{


    createPessoaJuridica = async (pessoa: PessoaJurdicaIn)=>{
        return await prisma.juridica.create({
          data:{
            pes_id: pessoa.id,
            cnpj: pessoa.cnpj,
            insc_estadual: pessoa.insc_estadual,
            site: pessoa.site,
            razao_social: pessoa.razao_social
          }
        });
        
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
