import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';
import { ProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Post()
  @ApiTags('Products')
  async create(@Body() body: ProductDTO, @Res() response: Response) {
    return response.status(200).json(await this.service.create(body));
  }

  @Patch('/:id')
  @ApiTags('Products')
  async update(@Param('id') id: string, @Res() response: Response) {
    return response.status(200).json({ id });
  }

  @Get()
  @ApiTags('Products')
  async list() {}

  @Get('/:id')
  @ApiTags('Products')
  async get(@Param('id') id: string, @Res() response: Response) {
    return response.status(200).json({ id });
  }

  @Delete('/:id')
  @ApiTags('Products')
  async remove(@Param('id') id: string, @Res() response: Response) {
    return response.status(200).json({ id });
  }
}
