/*
  Warnings:

  - The primary key for the `Distributor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `contactFirstName` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `contactLastName` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Distributor` table. All the data in the column will be lost.
  - You are about to drop the column `whatsappNumber` on the `Distributor` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `ADDRESS` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - The required column `DISTRIBUTOR_ID` was added to the `Distributor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `EMAIL` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FIRST_NAME` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LAST_NAME` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LATITUDE` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LONGITUDE` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PHONE_NUMBER` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLAN_TYPE` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `POSTAL_CODE` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `REGION` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UPDATED_AT` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WHATSAPP_NUMBER` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAIL` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FIRST_NAME` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LAST_NAME` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PASSWORD` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UPDATED_AT` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `USER_ID` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Distributor" (
    "DISTRIBUTOR_ID" TEXT NOT NULL PRIMARY KEY,
    "PLAN_TYPE" TEXT NOT NULL,
    "ADDRESS" TEXT NOT NULL,
    "REGION" TEXT NOT NULL,
    "POSTAL_CODE" TEXT NOT NULL,
    "LONGITUDE" REAL NOT NULL,
    "LATITUDE" REAL NOT NULL,
    "WHATSAPP_NUMBER" TEXT NOT NULL,
    "PHONE_NUMBER" TEXT NOT NULL,
    "EMAIL" TEXT NOT NULL,
    "FIRST_NAME" TEXT NOT NULL,
    "LAST_NAME" TEXT NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL
);
DROP TABLE "Distributor";
ALTER TABLE "new_Distributor" RENAME TO "Distributor";
CREATE INDEX "IDX_DISTRIBUTOR_REGION" ON "Distributor"("REGION");
CREATE INDEX "IDX_DISTRIBUTOR_POSTAL_CODE" ON "Distributor"("POSTAL_CODE");
CREATE INDEX "IDX_DISTRIBUTOR_LATITUDE_LONGITUDE" ON "Distributor"("LATITUDE", "LONGITUDE");
CREATE TABLE "new_User" (
    "USER_ID" TEXT NOT NULL PRIMARY KEY,
    "FIRST_NAME" TEXT NOT NULL,
    "LAST_NAME" TEXT NOT NULL,
    "EMAIL" TEXT NOT NULL,
    "PASSWORD" TEXT NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL
);
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_EMAIL_key" ON "User"("EMAIL");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
