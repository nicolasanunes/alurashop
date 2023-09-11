import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserIdFromProduct1692900320642
  implements MigrationInterface
{
  name = 'RemoveUserIdFromProduct1692900320642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "user_id" character varying(100)`,
    );
  }
}
