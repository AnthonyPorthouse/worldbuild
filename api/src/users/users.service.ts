import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async findOneByEmail(email: string) {
    return this.database.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneById(id: string) {
    return this.database.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    return this.database.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });
  }
}
