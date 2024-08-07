import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, PrismaService],
})
export class UserModule {}
