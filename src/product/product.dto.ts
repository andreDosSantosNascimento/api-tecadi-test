import { ApiProperty } from '@nestjs/swagger';
import { GrupoEnum, Product, UmEnum } from './product.entity';
import { PaginationDTO } from 'src/util/pagination.dto';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class ProductDTO {
  @ApiProperty({
    example: 'TESTE',
    description: 'Código do cliente',
  })
  @IsNotEmpty()
  @IsString()
  codigoCliente: string;
  @ApiProperty({
    example: 'PANELA DE TESTE',
    description: 'Descrição do produto',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;
  @ApiProperty({
    example: 10,
    description: 'Peso bruto do produto',
  })
  @IsNotEmpty()
  @IsNumber()
  pesoBruto: number;
  @ApiProperty({
    example: 10,
    description: 'Peso liquido do produto',
  })
  @IsNotEmpty()
  @IsNumber()
  pesoLiquido: number;
  @ApiProperty({
    example: 'SUMI',
    description: 'Grupo do produto',
    enum: GrupoEnum,
  })
  @IsNotEmpty()
  @IsEnum(Product)
  grupo: GrupoEnum;
  @ApiProperty({
    example: 'UN',
    description: 'Unidade de medida',
    enum: UmEnum,
  })
  @IsNotEmpty()
  @IsEnum(Product)
  um: UmEnum;
}
export class ProductListDTO extends PaginationDTO {
  @ApiProperty({
    example: '5050-4040',
    description: 'Código de produto específico.',
    required: false,
  })
  @IsString()
  codigo: string;
}

export class ProductCodigoDTO {
  @ApiProperty({
    example: '5050-4040',
    description: 'Código de produto específico.',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  codigo: string;
}
