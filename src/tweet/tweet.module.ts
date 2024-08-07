import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService, PrismaService],
})
export class TweetModule {}
