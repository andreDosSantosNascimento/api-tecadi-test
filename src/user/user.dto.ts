import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    example: '001161',
    description: 'Código do usuário',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({
    example: 'CapivaRA167',
    description: 'Senha do usuário',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
