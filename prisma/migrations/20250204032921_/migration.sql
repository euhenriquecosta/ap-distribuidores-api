/*
  Warnings:

  - A unique constraint covering the columns `[LONGITUDE]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LATITUDE]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Distributor_LONGITUDE_key" ON "Distributor"("LONGITUDE");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_LATITUDE_key" ON "Distributor"("LATITUDE");
