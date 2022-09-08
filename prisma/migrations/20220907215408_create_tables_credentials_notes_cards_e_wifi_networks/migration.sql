/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDITO', 'DEBITO', 'CREDITO_DEBITO');

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "cardType" "CardType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wifiNetworks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "wifiNetworks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_userId_key" ON "notes"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_userId_key" ON "cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_title_userId_key" ON "credentials"("title", "userId");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifiNetworks" ADD CONSTRAINT "wifiNetworks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
