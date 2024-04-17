import { Controller, Get } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('worlds')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get('/')
  async getWorlds() {
    return this.worldService.getWorlds();
  }
}
