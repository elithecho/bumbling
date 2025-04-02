/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CenterAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CenterAdmin_userId_key" ON "CenterAdmin"("userId");
