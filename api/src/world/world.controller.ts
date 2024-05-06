import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/jwt-access-auth.guard';
import { WorldService } from './world.service';

@Controller('worlds')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get('/')
  @UseGuards(JwtAccessAuthGuard)
  async getWorlds() {
    return this.worldService.getWorlds();
  }
}
