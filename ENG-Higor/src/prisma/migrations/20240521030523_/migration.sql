-- AddForeignKey
ALTER TABLE "juridica" ADD CONSTRAINT "juridica_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisica" ADD CONSTRAINT "fisica_pes_id_fkey" FOREIGN KEY ("pes_id") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
