/*
  Warnings:

  - Added the required column `nome` to the `despesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesa" ADD COLUMN     "nome" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pessoaInteressada" (
    "Id" SERIAL NOT NULL,
    "evento_id" INTEGER NOT NULL,
    "nome" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "telefone" VARCHAR(12) NOT NULL,

    CONSTRAINT "pessoaInteressada_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoaInteressada_email_key" ON "pessoaInteressada"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaInteressada_telefone_key" ON "pessoaInteressada"("telefone");
