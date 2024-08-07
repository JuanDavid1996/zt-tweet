/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "lat" STRING;
ALTER TABLE "Tweet" ADD COLUMN     "lng" STRING;
ALTER TABLE "Tweet" ADD COLUMN     "placeName" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
