import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async findOne(email: string) {
    return this.database.user.findUnique({
      where: {
        email,
      },
    });
  }
}
