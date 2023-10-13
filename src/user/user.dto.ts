import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    example: '001161',
    description: 'Código do usuário',
  })
  readonly username: string;
  @ApiProperty({
    example: 'CapivaRA167',
    description: 'Senha do usuário',
  })
  password: string;
}
