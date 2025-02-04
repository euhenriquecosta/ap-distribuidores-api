/*
  Warnings:

  - A unique constraint covering the columns `[LATITUDE,LONGITUDE]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Distributor_LATITUDE_LONGITUDE_key" ON "Distributor"("LATITUDE", "LONGITUDE");
