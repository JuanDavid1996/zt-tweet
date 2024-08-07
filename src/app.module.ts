import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TweetModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
