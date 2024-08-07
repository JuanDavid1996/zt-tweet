import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: Record<string, any>, @Res() res: Response) {
    try {
      const result = await this.authService.login(body.username, body.password);
      res.send(result);
    } catch (e) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        error: e,
      });
    }
  }
}
