import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1781943162624 implements MigrationInterface {
    name = 'Init1781943162624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
