import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1781835269986 implements MigrationInterface {
  name = 'Init1781835269986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "themes" ADD "is_active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "themes" DROP COLUMN "is_active"`);
  }
}
