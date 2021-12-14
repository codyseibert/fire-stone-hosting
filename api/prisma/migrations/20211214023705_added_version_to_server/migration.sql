/*
  Warnings:

  - Added the required column `version` to the `servers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servers" ADD COLUMN     "version" VARCHAR(255) NOT NULL;
