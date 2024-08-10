import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from '@prisma/client';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

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
    @Res() res: Response,
  ) {
    try {
      const ownerId = req['user'].id as number;
      const result = await this.tweetService.update(
        id,
        tweet as Tweet,
        ownerId,
      );
      res.send(result);
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).send({
        error: e,
      });
    }
  }

  @UseGuards(AuthGuardOptional)
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ownerId = req['user']?.id;
    let likesAndRetweet: any = false;

    if (ownerId) {
      likesAndRetweet = {
        where: {
          ownerId,
        },
      };
    }

    try {
      const result = await this.tweetService.findById(id, {
        replies: {
          orderBy: {
            id: 'desc',
          },
        },
        parent: true,
        attachments: true,
        _count: {
          select: {
            likes: true,
            retweets: true,
          },
        },
        likes: likesAndRetweet,
        retweets: likesAndRetweet,
      });
      res.send(result);
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).send({
        error: e,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const ownerId = req['user'].id as number;
      await this.tweetService.delete(id, ownerId);
      res.send({ success: true });
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).send({
        error: e,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id/toggle_like')
  async toggleLike(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const ownerId = req['user'].id as number;
      await this.tweetService.toggleLike(id, ownerId);
      res.send({ success: true });
    } catch (e) {
      res.status(HttpStatus.FORBIDDEN).send({
        error: e,
      });
    }
  }

  @UseGuards(AuthGuardOptional)
  @Get()
  async findAll(@Req() req: Request): Promise<Tweet[]> {
    const ownerId = req['user']?.id;
    let likesAndRetweet: any = false;

    if (ownerId) {
      likesAndRetweet = {
        where: {
          ownerId,
        },
      };
    }

    return this.tweetService.tweets(likesAndRetweet, likesAndRetweet);
  }
}
