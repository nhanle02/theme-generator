import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1781833757984 implements MigrationInterface {
  name = 'Init1781833757984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "themes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "category" character varying NOT NULL, "preview_url" character varying, "prompt_template" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ddbeaab913c18682e5c88155592" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "themes"`);
  }
}
