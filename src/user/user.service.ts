import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}
  create(userDTO: UserDTO) {
    return this.repository.save(userDTO);
  }
}
