import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { genSalt, hashSync } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}
  create(userDTO: UserDTO) {
    const salt = 10;
    genSalt(salt, (error) => {
      if (!error) {
        userDTO.password = hashSync(userDTO.password, salt);
      }
    });
    return this.repository.save(userDTO);
  }
}
