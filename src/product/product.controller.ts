import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';
import { ProductCodigoDTO, ProductDTO, ProductListDTO } from './product.dto';
import {
  Controller,
  Body,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  Query,
} from '@nestjs/common';
import { Product } from './product.entity';
import { DeepPartial } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Post()
  @ApiBearerAuth()
  @ApiTags('Products')
  async create(@Body() body: ProductDTO, @Res() response: Response) {
    try {
      await this.service.create(body);
      return response
        .status(201)
        .json({ message: 'Produto cadastrado com sucesso' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Patch()
  @ApiBearerAuth()
  @ApiTags('Products')
  async update(
    @Query() query: ProductCodigoDTO,
    @Body() body: ProductDTO,
    @Res() response: Response,
  ) {
    const data: DeepPartial<Product> = {
      ...body,
      codigo: query.codigo,
    };
    try {
      return response.status(200).json(await this.service.update(data));
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiTags('Products')
  async list(@Query() query: ProductListDTO, @Res() response: Response) {
    try {
      console.log('entrou');
      
      return response.status(200).json(await this.service.list(query));
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Delete()
  @ApiBearerAuth()
  @ApiTags('Products')
  async remove(@Query() query: ProductCodigoDTO, @Res() response: Response) {
    try {
      await this.service.remove(query.codigo);
      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
