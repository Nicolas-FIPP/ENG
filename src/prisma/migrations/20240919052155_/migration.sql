-- CreateEnum
CREATE TYPE "DeliveryOption" AS ENUM ('entrega', 'coleta');

-- CreateTable
CREATE TABLE "beneficio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dt_entrega" TIMESTAMP(3) NOT NULL,
    "qtde" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id" INTEGER,

    CONSTRAINT "beneficio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dt_vencimento" TIMESTAMP(3) NOT NULL,
    "dt_pagamento" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tde_id" INTEGER NOT NULL,
    "usu_id" INTEGER NOT NULL,
    "eve_id" INTEGER,

    CONSTRAINT "despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doacao" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "cep" VARCHAR(8) NOT NULL,
    "numero" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id" INTEGER NOT NULL,

    CONSTRAINT "doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_doacao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "tel" VARCHAR(11) NOT NULL DEFAULT '',
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
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "agenda_doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donativo" (
    "id" SERIAL NOT NULL,
    "desc" TEXT,
    "valor_total" DOUBLE PRECISION,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,
    "dt_ini" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "cep" VARCHAR(8) NOT NULL,
    "numero" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id_responsavel" INTEGER,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_beneficio" (
    "don_id" INTEGER NOT NULL,
    "ben_id" INTEGER NOT NULL,

    CONSTRAINT "itens_beneficio_pkey" PRIMARY KEY ("don_id","ben_id")
);

-- CreateTable
CREATE TABLE "itens_doacao" (
    "doa_id" INTEGER NOT NULL,
    "don_id" INTEGER NOT NULL,
    "itsdoa_valor" DECIMAL(65,30),
    "itsdoa_qtde" INTEGER,

    CONSTRAINT "itens_doacao_pkey" PRIMARY KEY ("doa_id","don_id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "id" SERIAL NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id" INTEGER NOT NULL,
    "ofi_id" INTEGER,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oficina" (
    "id" SERIAL NOT NULL,
    "limite" INTEGER NOT NULL,
    "disciplina" TEXT NOT NULL,
    "sala" INTEGER NOT NULL,
    "dt_ini" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "dias_funcionamento" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id" INTEGER NOT NULL,
    "tof_id" INTEGER NOT NULL,

    CONSTRAINT "oficina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametrizacao" (
    "pes_id" INTEGER NOT NULL,
    "par_logo_grande" TEXT,
    "par_logo_pequeno" TEXT,

    CONSTRAINT "parametrizacao_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "participante" (
    "pes_id" INTEGER NOT NULL,
    "eve_id" INTEGER NOT NULL,

    CONSTRAINT "participante_pkey" PRIMARY KEY ("pes_id","eve_id")
);

-- CreateTable
CREATE TABLE "pessoaInteressada" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "telefone" VARCHAR(12) NOT NULL,

    CONSTRAINT "pessoaInteressada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tel" VARCHAR(11) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "cep" VARCHAR(8) NOT NULL,
    "numero" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "juridica" (
    "pes_id" INTEGER NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "insc_estadual" TEXT NOT NULL,
    "site" TEXT,
    "razao_social" TEXT NOT NULL,

    CONSTRAINT "juridica_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "fisica" (
    "pes_id" INTEGER NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "dt_nasc" TIMESTAMP(3) NOT NULL,
    "sexo" VARCHAR(1) NOT NULL,
    "rg" VARCHAR(9) NOT NULL,

    CONSTRAINT "fisica_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "tipo_despesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipo_despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_oficina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipo_oficina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "senha" TEXT NOT NULL,
    "nivel_acesso" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pes_id" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoaInteressada_email_key" ON "pessoaInteressada"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaInteressada_telefone_key" ON "pessoaInteressada"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_tel_key" ON "pessoa"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_email_key" ON "pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "juridica_cnpj_key" ON "juridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "juridica_insc_estadual_key" ON "juridica"("insc_estadual");

-- CreateIndex
CREATE UNIQUE INDEX "juridica_site_key" ON "juridica"("site");

-- CreateIndex
CREATE UNIQUE INDEX "juridica_razao_social_key" ON "juridica"("razao_social");

-- CreateIndex
CREATE UNIQUE INDEX "fisica_cpf_key" ON "fisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "fisica_rg_key" ON "fisica"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_pes_id_key" ON "usuario"("pes_id");

-- AddForeignKey
ALTER TABLE "beneficio" ADD CONSTRAINT "beneficio_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_eve_id_fkey" FOREIGN KEY ("eve_id") REFERENCES "evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_tde_id_fkey" FOREIGN KEY ("tde_id") REFERENCES "tipo_despesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_usu_id_fkey" FOREIGN KEY ("usu_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_pes_id_responsavel_fkey" FOREIGN KEY ("pes_id_responsavel") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_beneficio" ADD CONSTRAINT "itens_beneficio_ben_id_fkey" FOREIGN KEY ("ben_id") REFERENCES "beneficio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_beneficio" ADD CONSTRAINT "itens_beneficio_don_id_fkey" FOREIGN KEY ("don_id") REFERENCES "donativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_doacao" ADD CONSTRAINT "itens_doacao_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_doacao" ADD CONSTRAINT "itens_doacao_don_id_fkey" FOREIGN KEY ("don_id") REFERENCES "donativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_ofi_id_fkey" FOREIGN KEY ("ofi_id") REFERENCES "oficina"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "fisica"("pes_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oficina" ADD CONSTRAINT "oficina_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oficina" ADD CONSTRAINT "oficina_tof_id_fkey" FOREIGN KEY ("tof_id") REFERENCES "tipo_oficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parametrizacao" ADD CONSTRAINT "parametrizacao_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "juridica"("pes_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participante" ADD CONSTRAINT "participante_eve_id_fkey" FOREIGN KEY ("eve_id") REFERENCES "evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participante" ADD CONSTRAINT "participante_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "fisica"("pes_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juridica" ADD CONSTRAINT "juridica_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisica" ADD CONSTRAINT "fisica_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "fisica"("pes_id") ON DELETE RESTRICT ON UPDATE CASCADE;
