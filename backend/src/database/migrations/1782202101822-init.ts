import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1782202101822 implements MigrationInterface {
  name = 'Init1782202101822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "themes" ADD "preview_public_id" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "themes" DROP COLUMN "preview_public_id"`,
    );
  }
}
