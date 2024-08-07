/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Tweet_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
ALTER TABLE "User" ADD COLUMN     "password" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "username" STRING;
