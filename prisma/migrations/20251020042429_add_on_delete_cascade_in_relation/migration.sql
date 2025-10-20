-- DropForeignKey
ALTER TABLE "districts" DROP CONSTRAINT "districts_regency_id_fkey";

-- DropForeignKey
ALTER TABLE "regencies" DROP CONSTRAINT "regencies_province_id_fkey";

-- DropForeignKey
ALTER TABLE "traditional_clothings" DROP CONSTRAINT "traditional_clothings_province_id_fkey";

-- DropForeignKey
ALTER TABLE "traditional_foods" DROP CONSTRAINT "traditional_foods_province_id_fkey";

-- DropForeignKey
ALTER TABLE "traditional_houses" DROP CONSTRAINT "traditional_houses_province_id_fkey";

-- DropForeignKey
ALTER TABLE "villages" DROP CONSTRAINT "villages_district_id_fkey";

-- AddForeignKey
ALTER TABLE "regencies" ADD CONSTRAINT "regencies_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_regency_id_fkey" FOREIGN KEY ("regency_id") REFERENCES "regencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villages" ADD CONSTRAINT "villages_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traditional_clothings" ADD CONSTRAINT "traditional_clothings_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traditional_houses" ADD CONSTRAINT "traditional_houses_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traditional_foods" ADD CONSTRAINT "traditional_foods_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
