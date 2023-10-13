import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum GrupoEnum {
  SPRI = 'SPRI',
  RITR = 'RITR',
  MINE = 'MINE',
  SOVE = 'SOVE',
  SUMI = 'SUMI',
}

export enum UmEnum {
  UN = 'UN',
  KG = 'KG',
  AP = 'AP',
  CX = 'CX',
}

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({ name: 'codigo', nullable: false, primary: true })
  codigo: string;

  @Column({ name: 'codigo_cliente', nullable: false })
  codigoCliente: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({
    precision: 10,
    scale: 2,
    name: 'peso_bruto',
    type: 'decimal',
    nullable: false,
  })
  pesoBruto: number;

  @Column({
    precision: 10,
    scale: 2,
    name: 'peso_liquido',
    type: 'decimal',
    nullable: false,
  })
  pesoLiquido: number;

  @Column({ type: 'enum', enum: Object.values(GrupoEnum), nullable: false })
  grupo: GrupoEnum;

  @Column({ type: 'enum', enum: Object.values(UmEnum), nullable: false })
  um: UmEnum;
}
