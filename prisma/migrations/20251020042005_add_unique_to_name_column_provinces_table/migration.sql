/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `provinces` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "provinces" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- CreateIndex
CREATE UNIQUE INDEX "provinces_name_key" ON "provinces"("name");
