import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';

config();

const configService = new ConfigService();

export const datasource = new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOST', 'db'),
  port: configService.getOrThrow('DATABASE_PORT', 5432),
  username: configService.getOrThrow('DATABASE_USERNAME', 'postgres'),
  password: configService.getOrThrow('DATABASE_PASSWORD', 'postgres'),
  database: configService.getOrThrow('DATABASE_DATABASE', 'postgres'),
  entities: [User],
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
