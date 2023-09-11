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
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(productData);

    return {
      product: createdProduct,
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
