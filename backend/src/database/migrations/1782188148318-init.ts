import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1782188148318 implements MigrationInterface {
  name = 'Init1782188148318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "generation_history" ("id" SERIAL NOT NULL, "user_id" integer, "guest_session_id" integer, "type" character varying NOT NULL, "status" "public"."generation_history_status_enum" NOT NULL DEFAULT 'processing', "theme_id" integer, "input_json" json, "output_json" json, "credits_used" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9733cabd3fd7ff75e217f0f28e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "guest_sessions" ("id" SERIAL NOT NULL, "session_id" character varying NOT NULL, "fingerprint_id" character varying, "ip_address" character varying, "generation_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_731388b8b94413305a698da45dd" UNIQUE ("session_id"), CONSTRAINT "PK_7c077389b040139ae9487c1b03e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "themes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "category" character varying NOT NULL, "preview_url" character varying, "prompt_template" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ddbeaab913c18682e5c88155592" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "google_id" character varying, "email" character varying NOT NULL, "password" character varying, "provider" "public"."users_provider_enum" NOT NULL DEFAULT 'local', "name" character varying NOT NULL, "avatar_url" character varying, "credit_balance" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "themes"`);
    await queryRunner.query(`DROP TABLE "guest_sessions"`);
    await queryRunner.query(`DROP TABLE "generation_history"`);
  }
}
