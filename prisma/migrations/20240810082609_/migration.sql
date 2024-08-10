/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,tweetId]` on the table `UserLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,tweetId]` on the table `UserRetweet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLike_ownerId_tweetId_key" ON "UserLike"("ownerId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRetweet_ownerId_tweetId_key" ON "UserRetweet"("ownerId", "tweetId");
