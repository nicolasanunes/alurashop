import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './CreateProduct.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
