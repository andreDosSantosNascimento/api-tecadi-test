import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

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
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Methods',
          'GET, PUT, POST, DELETE, OPTIONS',
        );
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      })
      .forRoutes('*');
  }
}
