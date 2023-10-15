import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { config } from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        await this.repository.findOneOrFail({
          where: { username: decodedToken['username'] },
        });
        next();
      } catch (error) {
        return response
          .status(401)
          .json({ message: 'Token não é válido', error: error.message });
      }
    } else {
      return response.status(401).json({ message: 'Token não fornecido' });
    }
  }
}
