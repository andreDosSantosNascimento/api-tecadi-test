import { Controller, Post, Res, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private service: UserService) {}
  @Post('/user')
  @ApiTags('Users')
  public async create(@Body() data: UserDTO, @Res() response: Response) {
    try {
      const { password, ...rest } = await this.service.create(data);
      return response.status(201).json(rest);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar usuário',
        error: error.message,
      });
    }
  }
  @Post('/login')
  @ApiTags('Users')
  public async login(@Query() data: UserDTO, @Res() response: Response) {
    try {
      return response.status(200).json(await this.service.login(data));
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar usuário',
        error: error.message,
      });
    }
  }
}
