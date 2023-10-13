import { GrupoEnum, UmEnum } from '../product/product.entity';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1697126873283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'codigo_cliente',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'peso_bruto',
            type: 'decimal(10, 2)',
          },
          {
            name: 'peso_liquido',
            type: 'decimal(10, 2)',
          },
          {
            name: 'grupo',
            type: 'enum',
            enum: Object.values(GrupoEnum),
            length: '255',
          },
          {
            name: 'um',
            type: 'enum',
            enum: Object.values(UmEnum),
            length: '255',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true, true, true);
  }
}
