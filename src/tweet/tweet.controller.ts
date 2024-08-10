import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() tweet: Record<string, any>, @Req() req: Request) {
    const ownerId = req['user'].id;
    return this.tweetService.create({ ...tweet, ownerId } as Tweet);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() tweet: Record<string, any>,
    @Req() req: Request,
  ) {
    const ownerId = req['user'].id;
    return this.tweetService.update({ ...tweet, id, ownerId } as Tweet);
  }

  @Get()
  async findAll(): Promise<Tweet[]> {
    return this.tweetService.tweets();
  }
}
