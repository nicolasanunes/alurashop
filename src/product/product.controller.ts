import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductService } from './product.service';
import { ListProductDTO } from './dto/ListProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = randomUUID();
    productEntity.name = productData.name;
    productEntity.userId = productData.userId;
    productEntity.value = productData.value;
    productEntity.availableQuantity = productData.availableQuantity;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;

    this.productService.createProduct(productEntity);
    return {
      product: new ListProductDTO(
        productEntity.id,
        productEntity.name,
        productEntity.userId,
        productEntity.value,
        productEntity.availableQuantity,
        productEntity.description,
        productEntity.characteristics,
        productEntity.images,
        productEntity.category,
      ),
      message: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async listProduct() {
    const savedProducts = await this.productService.listProduct();
    return savedProducts;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: UpdateProductDTO,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, newData);

    return {
      product: updatedProduct,
      message: 'Produto atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const removedProduct = await this.productService.removeProduct(id);

    return {
      product: removedProduct,
      message: 'Produto removido com sucesso!',
    };
  }
}
