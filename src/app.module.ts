import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'db'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USERNAME', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        database: configService.get('DATABASE_DATABASE', 'postgres'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE', false),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>
        await new DataSource(options).initialize(),
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [...userProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('product');
  }
}
