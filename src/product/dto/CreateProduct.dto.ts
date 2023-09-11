import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../product.entity';

export class ProductCharacteristicsDTO {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  product: ProductEntity;
}

export class ProductImagesDTO {
  id: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  product: ProductEntity;
}

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @Min(0)
  availableQuantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicsDTO)
  characteristics: ProductCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImagesDTO)
  images: ProductImagesDTO[];

  @IsNotEmpty()
  category: string;
}
