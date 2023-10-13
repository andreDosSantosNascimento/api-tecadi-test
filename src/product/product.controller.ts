import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';
import { ProductDTO } from './product.dto';
import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Query,
} from '@nestjs/common';

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

  @Delete()
  @ApiTags('Products')
  async remove(@Query('codigo') codigo: string, @Res() response: Response) {
    try {
      await this.service.remove(codigo);
      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
