import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';
import { ProductCodigoDTO, ProductDTO, ProductListDTO } from './product.dto';
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

  @Patch()
  @ApiTags('Products')
  async update(
    @Query() query: ProductCodigoDTO,
    @Body() body: ProductDTO,
    @Res() response: Response,
  ) {
    return response.status(200).json(
      await this.service.update({
        ...body,
        codigo: query.codigo,
      } as ProductDTO),
    );
  }

  @Get()
  @ApiTags('Products')
  async list(@Query() query: ProductListDTO, @Res() response: Response) {
    return response.status(200).json(await this.service.list(query));
  }

  @Delete()
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
