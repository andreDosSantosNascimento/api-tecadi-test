import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    example: '001161',
    description: 'Código do usuário',
  })
  readonly username: string;
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;
}
