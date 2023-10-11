import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/config/typeOrm.config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
