/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterSequence
ALTER SEQUENCE "UserLike_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "UserRetweet_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;
