/*
  Warnings:

  - You are about to drop the `tradisional_clothings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tradisional_clothings" DROP CONSTRAINT "tradisional_clothings_province_id_fkey";

-- DropTable
DROP TABLE "tradisional_clothings";

-- CreateTable
CREATE TABLE "traditional_clothings" (
    "id" SERIAL NOT NULL,
    "province_id" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "traditional_clothings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "traditional_clothings" ADD CONSTRAINT "traditional_clothings_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
