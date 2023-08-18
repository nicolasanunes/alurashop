import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  list() {
    return this.products;
  }

  save(productData: ProductEntity) {
    this.products.push(productData);
    return productData;
  }

  private findById(id: string) {
    const possibleProduct = this.products.find((product) => product.id === id);
    if (!possibleProduct) {
      throw new Error('Produto não existe!');
    }
    return possibleProduct;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const nonUpdateableData = ['id', 'userId'];
    const product = this.findById(id);
    Object.entries(productData).forEach(([key, value]) => {
      if (nonUpdateableData.includes(key)) {
        return;
      }
      product[key] = value;
    });
    return product;
  }

  async remove(id: string) {
    const removedProduct = this.findById(id);
    this.products = this.products.filter((product) => product.id !== id);
    return removedProduct;
  }
}
