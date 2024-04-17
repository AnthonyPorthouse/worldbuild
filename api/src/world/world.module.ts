import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';

@Module({
  providers: [WorldService],
  controllers: [WorldController],
  imports: [DatabaseModule],
  exports: [WorldService],
})
export class WorldModule {}
