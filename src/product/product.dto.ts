import { ApiProperty } from '@nestjs/swagger';
import { GrupoEnum, UmEnum } from './product.entity';

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
  })
  grupo: GrupoEnum;
  @ApiProperty({
    example: 'UN',
    description: 'Unidade de medida',
  })
  um: UmEnum;
}
