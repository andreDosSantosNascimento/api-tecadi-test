import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    example: 0,
    description:
      'Indica a partir de qual registro será deslocado o retorno. Se o retorno por exemplo houver 100 registros, e for informado offset = 50, será retornado os registros a partir da posição 50 com o número limitado que for indicado no parâmetro limit. OBS: Deve-se atentar quando for informado o parâmetro codigo, onde retorna apenas 1 registro, neste caso, offset deve igual a 0.',
  })
  @IsNotEmpty()
  @IsNumber()
  offset: number;
  @ApiProperty({
    example: 50,
    description:
      'Indica o número de registros que será exibido. Se offset = 50 e o limit = 10, será retornado as posições: 50, 51, 52, 53, 54, 55, 56, 57, 58 e 59. Totalizando 10 registros a partir da posição 50 de resultados.',
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
