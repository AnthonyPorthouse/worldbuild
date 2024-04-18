import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    let valid = false;

    if (user) {
      valid = await verify(user.password, password);
    }

    if (valid) {
      return user;
    }

    return null;
  }

  private async getTokens(payload: { sub: string; email: string }) {
    return await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.signingSecret,
        expiresIn: '60s',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: '7d',
      }),
    ]);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    const [access_token, refresh_token] = await this.getTokens(payload);

    await this.usersService.updateRefreshToken(user, refresh_token);

    return {
      access_token,
      refresh_token,
    };
  }
}
