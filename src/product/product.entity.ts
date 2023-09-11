import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductCharacteristicsEntity } from './product-characteristics.entity';
import { ProductImagesEntity } from './product-images.entity';
import { ItemInTheOrderEntity } from '../order/item-in-the-order.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProductImagesEntity,
    (productImages) => productImages.product,
    {
      cascade: true,
      eager: true,
    },
  )
  images: ProductImagesEntity[];

  @OneToMany(
    () => ProductCharacteristicsEntity,
    (productCharacteristics) => productCharacteristics.product,
    { cascade: true, eager: true },
  )
  characteristics: ProductCharacteristicsEntity[];

  @OneToMany(
    () => ItemInTheOrderEntity,
    (itemInTheOrder) => itemInTheOrder.product,
  )
  itemsInTheOrder: ItemInTheOrderEntity[];
}
