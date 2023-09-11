import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderStatus } from './enum/order-status.enum';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { ItemInTheOrderEntity } from './item-in-the-order.entity';
import { ProductEntity } from '../product/product.entity';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async findUser(id) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }

    return user;
  }

  private treatOrderData(
    orderData: CreateOrderDTO,
    relatedProducts: ProductEntity[],
  ) {
    orderData.itemsInTheOrder.forEach((itemInTheOrder) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === itemInTheOrder.productId,
      );

      if (relatedProduct === undefined) {
        throw new NotFoundException(
          `O produto com o ID ${itemInTheOrder.productId} não foi encontrado!`,
        );
      }

      if (itemInTheOrder.quantity > relatedProduct.availableQuantity) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemInTheOrder.quantity}) é maior do que a disponível (${relatedProduct.availableQuantity}) para o produto ${relatedProduct.name}!`,
        );
      }
    });
  }

  async createOrder(userId: string, orderData: CreateOrderDTO) {
    const user = await this.findUser(userId);
    const productIds = orderData.itemsInTheOrder.map(
      (itemInTheOrder) => itemInTheOrder.productId,
    );

    const relatedProducts = await this.productRepository.findBy({
      id: In(productIds),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;

    const itemsInTheOrderEntities = orderData.itemsInTheOrder.map(
      (itemInTheOrder) => {
        const relatedProduct = relatedProducts.find(
          (product) => product.id === itemInTheOrder.productId,
        );

        this.treatOrderData(orderData, relatedProducts);

        const itemInTheOrderEntity = new ItemInTheOrderEntity();

        itemInTheOrderEntity.product = relatedProduct!;
        itemInTheOrderEntity.salePrice = relatedProduct!.value;
        itemInTheOrderEntity.quantity = itemInTheOrder.quantity;
        itemInTheOrderEntity.product.availableQuantity -=
          itemInTheOrder.quantity;
        return itemInTheOrderEntity;
      },
    );

    const totalValue = itemsInTheOrderEntities.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0);

    orderEntity.itemsInTheOrder = itemsInTheOrderEntities;
    orderEntity.totalValue = totalValue;

    const orderCreated = await this.orderRepository.save(orderEntity);
    return orderCreated;
  }

  async listOrder(userId: string) {
    const user = await this.findUser(userId);

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }

    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }

  async updateOrder(id: string, newData: UpdateOrderDTO) {
    const order = await this.orderRepository.findOneBy({ id });

    if (order === null) {
      throw new NotFoundException('O pedido não foi encontrado!');
    }

    Object.assign(order, newData as OrderEntity);

    return this.orderRepository.save(order);
  }
}
