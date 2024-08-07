/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const rightUsername = user.username.startsWith('@')
      ? user.username
      : '@' + user.username;

    const userGive = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: user.email,
            },
          },
          {
            username: {
              equals: rightUsername,
            },
          },
        ],
      },
    });

    if (userGive) {
      const isEmailFound = userGive.email == user.email;

      if (isEmailFound) {
        throw 'email is already taken';
      }

      throw 'username is already taken';
    }

    return await this.prisma.user.create({
      data: {
        ...user,
        username: rightUsername,
      },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
  }
}
