import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorldService {
  constructor(private readonly db: DatabaseService) {}

  async getWorlds() {
    return this.db.world.findMany();
  }

  async getWorld(query: Prisma.WorldWhereUniqueInput) {
    return this.db.world.findUnique({
      where: query,
    });
  }
}
