import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtAccessAuthGuard } from './jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard copy';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('me')
  async currentUser(@Request() req: Request & { user: User }) {
    return req.user;
  }
}
