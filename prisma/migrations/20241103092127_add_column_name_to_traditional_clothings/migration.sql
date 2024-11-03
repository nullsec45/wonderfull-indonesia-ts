/*
  Warnings:

  - Added the required column `name` to the `traditional_clothings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "traditional_clothings" ADD COLUMN     "name" VARCHAR(255) NOT NULL;
