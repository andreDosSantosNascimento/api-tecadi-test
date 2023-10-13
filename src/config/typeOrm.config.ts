import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

config();

const configService = new ConfigService();

export const datasource = new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOST'),
  port: configService.getOrThrow('DATABASE_PORT'),
  username: configService.getOrThrow('DATABASE_USERNAME'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  database: configService.getOrThrow('DATABASE_DATABASE'),
  entities: [User, Product],
  migrations: [__dirname + '../../migrations/**'],
  synchronize: true,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = datasource;
      return dataSource.initialize();
    },
  },
];
