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

  async update(tweet: Tweet): Promise<Tweet> {
    return this.prisma.tweet.update({
      data: {
        ...tweet,
        updatedAt: new Date(),
      },
      where: {
        id: tweet.id,
      },
    });
  }

  async tweets(): Promise<Tweet[]> {
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
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
