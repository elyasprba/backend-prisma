/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_refresh_token_key" ON "Users"("refresh_token");
