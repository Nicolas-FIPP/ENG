import { PrismaClient } from "@prisma/client";
import { Agendain } from "dtos/AgendarDoacaoDTO";

const prisma = new PrismaClient();

export default class AgendarDoacaoModel{

    create = async (agenda: Agendain ) => {

        return await prisma.agenda.create({
    
          data: {
            

    
          }
        });
      }

}