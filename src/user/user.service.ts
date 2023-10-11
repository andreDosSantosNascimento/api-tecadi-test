import { genSalt, hashSync, compareSync } from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}
  create(userDTO: UserDTO) {
    const salt = 10;
    return this.repository.save({
      username: userDTO.username,
      password: hashSync(userDTO.password, salt),
    });
  }

  async login(userDTO: UserDTO) {
    const user = await this.repository.findOneBy({
      username: userDTO.username,
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (compareSync(userDTO.password, user.password)) {
      const access_token = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        process.env.SECRET_KEY,
      );
      const refresh_token = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
      );
      return {
        access_token,
        refresh_token,
        token_type: 'Bearer',
        expires_in: 3600,
      };
    }

    throw new Error('Senha inválida');
  }
}
