import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tweet } from '@prisma/client';

@Injectable()
export class TweetService {
  constructor(private prisma: PrismaService) {}

  async create(tweet: Tweet): Promise<Tweet> {
    return this.prisma.tweet.create({
      data: {
        ...tweet,
        createdAt: new Date(),
      },
    });
  }

  async update(
    tweetId: number,
    tweet: Record<string, any>,
    ownerId: number,
  ): Promise<Tweet> {
    const givenTweet = await this.findById(tweetId);
    if (!givenTweet) {
      throw 'Tweet not found';
    }

    if (givenTweet.ownerId != ownerId) {
      throw 'You are not the owner of this tweet';
    }

    delete tweet.id;
    delete tweet.ownerId;

    return this.prisma.tweet.update({
      data: {
        ...tweet,
        updatedAt: new Date(),
      },
      where: {
        id: tweetId,
      },
    });
  }

  async delete(tweetId: number, ownerId: number): Promise<void> {
    const tweet = await this.findById(tweetId);
    if (!tweet) {
      throw 'Tweet not found';
    }

    if (tweet.ownerId != ownerId) {
      throw 'You are not the owner of this tweet';
    }

    await this.prisma.tweet.delete({
      where: {
        id: tweetId,
      },
    });
  }

  async toggleLike(tweetId: number, ownerId: number): Promise<void> {
    const tweet = await this.findById(tweetId);
    if (!tweet) {
      throw 'Tweet not found';
    }

    const like = await this.prisma.userLike.findFirst({
      where: {
        tweetId,
        ownerId,
      },
    });

    if (like) {
      await this.prisma.userLike.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await this.prisma.userLike.create({
        data: {
          tweetId,
          ownerId,
        },
      });
    }
  }

  async findById(tweetId: number, include: any = null): Promise<Tweet | null> {
    return this.prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: include,
    });
  }

  async tweets(likes = null, retweets = null): Promise<Tweet[]> {
    return this.prisma.tweet.findMany({
      include: {
        parent: true,
        _count: {
          select: {
            replies: true,
            likes: true,
            retweets: true,
          },
        },
        attachments: true,
        owner: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        likes: likes,
        retweets: retweets,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
