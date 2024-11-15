/*
  Warnings:

  - The primary key for the `districts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `provinces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `regencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `traditional_clothings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - The primary key for the `villages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "districts" DROP CONSTRAINT "districts_regency_id_fkey";

-- DropForeignKey
ALTER TABLE "regencies" DROP CONSTRAINT "regencies_province_id_fkey";

-- DropForeignKey
ALTER TABLE "traditional_clothings" DROP CONSTRAINT "traditional_clothings_province_id_fkey";

-- DropForeignKey
ALTER TABLE "villages" DROP CONSTRAINT "villages_district_id_fkey";

-- AlterTable
ALTER TABLE "districts" DROP CONSTRAINT "districts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "regency_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "districts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "districts_id_seq";

-- AlterTable
ALTER TABLE "provinces" DROP CONSTRAINT "provinces_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "provinces_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "provinces_id_seq";

-- AlterTable
ALTER TABLE "regencies" DROP CONSTRAINT "regencies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "province_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "regencies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "regencies_id_seq";

-- AlterTable
ALTER TABLE "traditional_clothings" DROP CONSTRAINT "traditional_clothings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "province_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "traditional_clothings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "traditional_clothings_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "villages" DROP CONSTRAINT "villages_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "district_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "villages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "villages_id_seq";

-- AddForeignKey
ALTER TABLE "regencies" ADD CONSTRAINT "regencies_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_regency_id_fkey" FOREIGN KEY ("regency_id") REFERENCES "regencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villages" ADD CONSTRAINT "villages_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traditional_clothings" ADD CONSTRAINT "traditional_clothings_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
