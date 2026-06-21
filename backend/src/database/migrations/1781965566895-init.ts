import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1781965566895 implements MigrationInterface {
  name = 'Init1781965566895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_provider_enum" AS ENUM('local', 'google')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "provider" "public"."users_provider_enum" NOT NULL DEFAULT 'local'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
    await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
  }
}
