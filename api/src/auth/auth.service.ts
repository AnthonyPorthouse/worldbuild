import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    let valid = false;

    if (user) {
      valid = await verify(user.password, password);
    } else {
      await verify('', '');
    }

    if (valid) {
      return user;
    }

    return null;
  }
}
