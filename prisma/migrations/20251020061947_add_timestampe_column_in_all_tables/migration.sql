/*
  Warnings:

  - Added the required column `updatedAt` to the `districts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `provinces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `regencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `traditional_clothings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `traditional_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `traditional_houses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "districts" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "provinces" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "regencies" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "traditional_clothings" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "traditional_foods" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "traditional_houses" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
