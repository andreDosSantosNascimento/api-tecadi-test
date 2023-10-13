import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ProductDTO, ProductListDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private repository: Repository<Product>,
  ) {}
  async create(body: ProductDTO) {
    return await this.repository.save({
      ...body,
      codigo: body.grupo + body.codigoCliente,
    });
  }
  async update(data: DeepPartial<Product>) {
    return await this.repository.save(data);
  }
  async list(query: ProductListDTO) {
    const options = {
      skip: Number(query.offset),
      take: Number(query.limit),
      where: {},
    };

    if (query.codigo) {
      options.where = { codigo: query.codigo };
    }

    return {
      offset: options.skip,
      limit: options.take,
      list: await this.repository.find(options),
    };
  }
  async remove(codigo: string) {
    if (!codigo) {
      throw new Error('Código de produto não foi informado');
    }
    return await this.repository.delete(codigo);
  }
}
