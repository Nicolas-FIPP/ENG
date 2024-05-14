-- CreateTable
CREATE TABLE "beneficio" (
    "ben_id" SERIAL NOT NULL,
    "ben_nome" VARCHAR(50),
    "ben_data_ent" DATE,
    "ben_qtde" INTEGER,
    "pes_id" INTEGER,

    CONSTRAINT "beneficio_pkey" PRIMARY KEY ("ben_id")
);

-- CreateTable
CREATE TABLE "despesa" (
    "des_id" SERIAL NOT NULL,
    "des_valor" DECIMAL,
    "des_dtvencto" DATE,
    "des_dtpagto" DATE,
    "tde_id" INTEGER,
    "usu_id" INTEGER,
    "eve_id" INTEGER,

    CONSTRAINT "despesa_pkey" PRIMARY KEY ("des_id")
);

-- CreateTable
CREATE TABLE "doacao" (
    "doa_id" SERIAL NOT NULL,
    "doa_data" DATE,
    "doa_estado" VARCHAR(5),
    "doa_cidade" VARCHAR(50),
    "doa_rua" VARCHAR(70),
    "doa_bairro" VARCHAR(70),
    "doa_complemento" VARCHAR(50),
    "doa_cep" VARCHAR(40),
    "doa_numero" VARCHAR(40),
    "pes_id" INTEGER,

    CONSTRAINT "doacao_pkey" PRIMARY KEY ("doa_id")
);

-- CreateTable
CREATE TABLE "donativo" (
    "don_id" SERIAL NOT NULL,
    "don_desc" VARCHAR(50),
    "don_valor_total" DECIMAL,

    CONSTRAINT "donativo_pkey" PRIMARY KEY ("don_id")
);

-- CreateTable
CREATE TABLE "evento" (
    "eve_id" SERIAL NOT NULL,
    "eve_nome" VARCHAR(50),
    "eve_custo" DECIMAL,
    "eve_dtini" DATE,
    "eve_dtfim" DATE,
    "eve_estado" VARCHAR(5),
    "eve_cidade" VARCHAR(50),
    "eve_rua" VARCHAR(70),
    "eve_bairro" VARCHAR(70),
    "eve_cep" VARCHAR(40),
    "eve_numero" VARCHAR(40),
    "eve_complemento" VARCHAR(50),
    "pes_id_responsavel" INTEGER,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("eve_id")
);

-- CreateTable
CREATE TABLE "fisica" (
    "pes_id" SERIAL NOT NULL,
    "pesfis_cpf" VARCHAR(20),
    "pesfis_dtnasc" DATE,
    "pesfis_sexo" VARCHAR(2),
    "pesfis_rg" VARCHAR(20),

    CONSTRAINT "fisica_pkey" PRIMARY KEY ("pes_id")
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
    "itsdoa_valor" DECIMAL,
    "itsdoa_qtde" INTEGER,

    CONSTRAINT "itens_doacao_pkey" PRIMARY KEY ("doa_id","don_id")
);

-- CreateTable
CREATE TABLE "juridica" (
    "pes_id" SERIAL NOT NULL,
    "pesjur_cnpj" VARCHAR(35),
    "pesjur_insc_estadual" VARCHAR(70),
    "pesjur_site" VARCHAR(90),
    "pesjur_razao_social" VARCHAR(80),

    CONSTRAINT "juridica_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "mat_id" SERIAL NOT NULL,
    "mat_data" DATE,
    "pes_id" INTEGER,
    "oficina_ofi_id" INTEGER,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("mat_id")
);

-- CreateTable
CREATE TABLE "oficina" (
    "ofi_id" SERIAL NOT NULL,
    "ofi_lim" INTEGER,
    "ofi_disc" VARCHAR(65),
    "ofi_sala" INTEGER,
    "ofi_dtini" DATE,
    "ofi_dtfim" DATE,
    "ofi_dias_funcionamento" VARCHAR(80),
    "pes_id" INTEGER,
    "tof_id" INTEGER,

    CONSTRAINT "oficina_pkey" PRIMARY KEY ("ofi_id")
);

-- CreateTable
CREATE TABLE "parametrizacao" (
    "pes_id" INTEGER NOT NULL,
    "par_logo_grande" VARCHAR(80),
    "par_logo_pequeno" VARCHAR(80),

    CONSTRAINT "parametrizacao_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "participante" (
    "pes_id" INTEGER NOT NULL,
    "eve_id" INTEGER NOT NULL,

    CONSTRAINT "participante_pkey" PRIMARY KEY ("pes_id","eve_id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "pes_id" SERIAL NOT NULL,
    "pes_nome" VARCHAR(80),
    "pes_tel" VARCHAR(20),
    "pes_status" INTEGER,
    "pes_email" VARCHAR(30),
    "pes_estado" VARCHAR(5),
    "pes_cidade" VARCHAR(50),
    "pes_rua" VARCHAR(70),
    "pes_bairro" VARCHAR(70),
    "pes_cep" VARCHAR(40),
    "pes_numero" VARCHAR(40),
    "pes_complemento" VARCHAR(50),

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("pes_id")
);

-- CreateTable
CREATE TABLE "tipo_despesa" (
    "tde_id" SERIAL NOT NULL,
    "tde_nome" VARCHAR(50),

    CONSTRAINT "tipo_despesa_pkey" PRIMARY KEY ("tde_id")
);

-- CreateTable
CREATE TABLE "tipo_oficina" (
    "tof_id" SERIAL NOT NULL,
    "tof_nome" VARCHAR(50),

    CONSTRAINT "tipo_oficina_pkey" PRIMARY KEY ("tof_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usu_id" SERIAL NOT NULL,
    "usu_senha" VARCHAR(50),
    "usu_nivel_acesso" INTEGER,
    "usu_status_ativo" INTEGER,
    "pes_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usu_id")
);

-- AddForeignKey
ALTER TABLE "beneficio" ADD CONSTRAINT "beneficio_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_eve_id_fkey" FOREIGN KEY ("eve_id") REFERENCES "evento"("eve_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_tde_id_fkey" FOREIGN KEY ("tde_id") REFERENCES "tipo_despesa"("tde_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_usu_id_fkey" FOREIGN KEY ("usu_id") REFERENCES "usuario"("usu_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_pes_id_responsavel_fkey" FOREIGN KEY ("pes_id_responsavel") REFERENCES "pessoa"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itens_beneficio" ADD CONSTRAINT "itens_beneficio_ben_id_fkey" FOREIGN KEY ("ben_id") REFERENCES "beneficio"("ben_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itens_beneficio" ADD CONSTRAINT "itens_beneficio_don_id_fkey" FOREIGN KEY ("don_id") REFERENCES "donativo"("don_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itens_doacao" ADD CONSTRAINT "itens_doacao_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doacao"("doa_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itens_doacao" ADD CONSTRAINT "itens_doacao_don_id_fkey" FOREIGN KEY ("don_id") REFERENCES "donativo"("don_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_oficina_ofi_id_fkey" FOREIGN KEY ("oficina_ofi_id") REFERENCES "oficina"("ofi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "fisica"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oficina" ADD CONSTRAINT "oficina_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oficina" ADD CONSTRAINT "oficina_tof_id_fkey" FOREIGN KEY ("tof_id") REFERENCES "tipo_oficina"("tof_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parametrizacao" ADD CONSTRAINT "parametrizacao_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "juridica"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participante" ADD CONSTRAINT "participante_eve_id_fkey" FOREIGN KEY ("eve_id") REFERENCES "evento"("eve_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participante" ADD CONSTRAINT "participante_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "fisica"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
