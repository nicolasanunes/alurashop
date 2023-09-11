import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
