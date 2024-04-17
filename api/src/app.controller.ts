import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request) {
    const data = this.appService.getStatus();

    return {
      _links: {
        self: `${req.protocol}://${req.get('Host')}${req.originalUrl}`,
      },

      data,
    };
  }
}
