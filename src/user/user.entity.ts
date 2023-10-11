import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'user_id', primary: true, generated: true })
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  password: string;
}
