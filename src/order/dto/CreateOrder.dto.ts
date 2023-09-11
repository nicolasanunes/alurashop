import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsInt,
  IsUUID,
} from 'class-validator';

class ItemInTheOrderDTO {
  @IsUUID()
  productId: string;

  @IsInt()
  quantity: number;
}

export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemInTheOrderDTO)
  itemsInTheOrder: ItemInTheOrderDTO[];
}
