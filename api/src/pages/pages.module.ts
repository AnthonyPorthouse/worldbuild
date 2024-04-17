import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorldModule } from 'src/world/world.module';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  providers: [PagesService],
  imports: [DatabaseModule, WorldModule],
  exports: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
