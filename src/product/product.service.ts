import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ListProductDTO } from './dto/ListProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async listProduct() {
    const savedProducts = await this.productRepository.find();
    const listProducts = savedProducts.map(
      (product) =>
        new ListProductDTO(
          product.id,
          product.userId,
          product.name,
          product.value,
          product.availableQuantity,
          product.description,
          product.characteristics,
          product.images,
          product.category,
        ),
    );
    return listProducts;
  }

  async updateProduct(id: string, productEntity: UpdateProductDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async removeProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
