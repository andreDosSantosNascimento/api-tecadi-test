import { Controller, Post, Res, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Post()
  @ApiTags('Users')
  public async create(@Query() data: UserDTO, @Res() response: Response) {
    const { password, ...rest } = await this.service.create(data);
    return response.status(200).json(rest);
  }
  public async login(@Query() data: UserDTO, @Res() response: Response) {
    return response.status(200).json(data);
  }
}
