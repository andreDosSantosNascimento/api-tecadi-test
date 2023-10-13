import { ApiProperty } from '@nestjs/swagger';
import { GrupoEnum, UmEnum } from './product.entity';
import { PaginationDTO } from 'src/util/pagination.dto';

export class ProductDTO {
  @ApiProperty({
    example: 'TESTE',
    description: 'Código do cliente',
  })
  codigoCliente: string;
  @ApiProperty({
    example: 'PANELA DE TESTE',
    description: 'Descrição do produto',
  })
  descricao: string;
  @ApiProperty({
    example: 10,
    description: 'Peso bruto do produto',
  })
  pesoBruto: number;
  @ApiProperty({
    example: 10,
    description: 'Peso liquido do produto',
  })
  pesoLiquido: number;
  @ApiProperty({
    example: 'SUMI',
    description: 'Grupo do produto',
    enum: GrupoEnum,
  })
  grupo: GrupoEnum;
  @ApiProperty({
    example: 'UN',
    description: 'Unidade de medida',
    enum: UmEnum,
  })
  um: UmEnum;
}
export class ProductListDTO extends PaginationDTO {
  @ApiProperty({
    example: '5050-4040',
    description: 'Código de produto específico.',
    required: false,
  })
  codigo: string;
}

export class ProductCodigoDTO {
  @ApiProperty({
    example: '5050-4040',
    description: 'Código de produto específico.',
    required: false,
  })
  codigo: string;
}
