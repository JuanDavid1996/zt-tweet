import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() user: User, @Res() res: Response) {
    try {
      const newUser = await this.userService.create(user);
      const result = await this.authService.login(
        newUser.username,
        newUser.password,
      );

      return res.send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: e,
      });
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.users();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.findById(id);
  }
}
