import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'item_in_the_order' })
export class ItemInTheOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'sale_price', nullable: false })
  salePrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.itemsInTheOrder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.itemsInTheOrder, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
