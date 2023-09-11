import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() orderData: CreateOrderDTO,
  ) {
    const createdOrder = await this.orderService.createOrder(userId, orderData);
    return createdOrder;
  }

  @Get()
  async listOrder(@Query('userId') userId: string) {
    const orders = await this.orderService.listOrder(userId);
    return orders;
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDTO,
  ) {
    return this.orderService.updateOrder(orderId, updateData);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
