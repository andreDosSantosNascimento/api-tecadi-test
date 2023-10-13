import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';

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
  async update() {}
  async list() {}
  async remove(codigo: string) {
    if (!codigo) {
      throw new Error('Código de produto não foi informado');
    }
    return await this.repository.delete(codigo);
  }
}
