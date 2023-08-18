import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
