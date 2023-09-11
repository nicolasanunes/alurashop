import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ListProductDTO } from './dto/ListProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productData: CreateProductDTO) {
    const productEntity = new ProductEntity();

    Object.assign(productEntity, productData as ProductEntity);

    return this.productRepository.save(productEntity);
  }

  async listProduct() {
    const savedProducts = await this.productRepository.find();
    const listProducts = savedProducts.map(
      (product) =>
        new ListProductDTO(
          product.id,
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

  async updateProduct(id: string, newData: UpdateProductDTO) {
    const product = await this.productRepository.findOneBy({ id });

    if (product === null) {
      throw new NotFoundException('O produto não foi encontrado!');
    }

    Object.assign(product, newData as ProductEntity);
    await this.productRepository.save(product);
  }

  async removeProduct(id: string) {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('O produto não foi encontrado!');
    }
  }
}
