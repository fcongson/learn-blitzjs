/*
  Warnings:

  - A unique constraint covering the columns `[bearId]` on the table `Cave` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bear" ADD COLUMN "caveId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Cave_bearId_unique" ON "Cave"("bearId");
