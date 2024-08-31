-- CreateEnum
CREATE TYPE "DeliveryOption" AS ENUM ('entrega', 'coleta');

-- CreateTable
CREATE TABLE "agenda_doacao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "delivery" "DeliveryOption" NOT NULL,
    "uf" VARCHAR(2),
    "cidade" TEXT,
    "rua" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "cep" VARCHAR(8),
    "numero" TEXT,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "agenda_doacao_pkey" PRIMARY KEY ("id")
);
