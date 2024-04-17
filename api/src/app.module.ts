import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PagesModule } from './pages/pages.module';
import { UsersModule } from './users/users.module';
import { WorldModule } from './world/world.module';

@Module({
  imports: [DatabaseModule, WorldModule, AuthModule, UsersModule, PagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
