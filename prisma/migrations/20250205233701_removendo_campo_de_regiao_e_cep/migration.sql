/*
  Warnings:

  - You are about to drop the column `POSTAL_CODE` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `REGION` on the `Distributor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "IDX_DISTRIBUTOR_POSTAL_CODE";

-- DropIndex
DROP INDEX "IDX_DISTRIBUTOR_REGION";

-- AlterTable
ALTER TABLE "Distributor" DROP COLUMN "POSTAL_CODE",
DROP COLUMN "REGION";
