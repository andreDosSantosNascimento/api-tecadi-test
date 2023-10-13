import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  password: string;
}
