import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelateOrderAndItemsInTheOrder1693245509552
  implements MigrationInterface
{
  name = 'RelateOrderAndItemsInTheOrder1693245509552';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_in_the_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "sale_price" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_4a9f849ea81335777a4f3e829c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" ADD CONSTRAINT "FK_b91670ee284ad203503209e3bea" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" DROP CONSTRAINT "FK_b91670ee284ad203503209e3bea"`,
    );
    await queryRunner.query(`DROP TABLE "item_in_the_order"`);
  }
}
