import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelateItemInTheOrderAndProduct1693316039103
  implements MigrationInterface
{
  name = 'RelateItemInTheOrderAndProduct1693316039103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" ADD "productId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" ADD CONSTRAINT "FK_7609e697fcb05bb0db3777b0da3" FOREIGN KEY ("productId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" DROP CONSTRAINT "FK_7609e697fcb05bb0db3777b0da3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_in_the_order" DROP COLUMN "productId"`,
    );
  }
}
