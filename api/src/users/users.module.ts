import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
