-- AlterSequence
ALTER SEQUENCE "Attachment_id_seq" MAXVALUE 9223372036854775807;

-- CreateTable
CREATE TABLE "UserLike" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "ownerId" INT4,
    "tweetId" INT4,

    CONSTRAINT "UserLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRetweet" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "ownerId" INT4,
    "tweetId" INT4,

    CONSTRAINT "UserRetweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLike" ADD CONSTRAINT "UserLike_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLike" ADD CONSTRAINT "UserLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRetweet" ADD CONSTRAINT "UserRetweet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRetweet" ADD CONSTRAINT "UserRetweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
