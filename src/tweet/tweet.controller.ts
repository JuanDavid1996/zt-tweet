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
import { AuthGuard } from 'src/auth/auth.guard';
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

  @Get()
  async findAll(): Promise<Tweet[]> {
    return this.tweetService.tweets();
  }
}
