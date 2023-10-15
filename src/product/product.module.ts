import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProviders } from './product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ...userProviders, ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('product');
  }
}
