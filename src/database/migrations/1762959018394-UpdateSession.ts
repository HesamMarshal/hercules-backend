import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSession1762959018394 implements MigrationInterface {
    name = 'UpdateSession1762959018394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."session_status_enum" RENAME TO "session_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."session_status_enum" AS ENUM('planed', 'active', 'paused', 'completed', 'cancelled', 'skipped')`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" TYPE "public"."session_status_enum" USING "status"::"text"::"public"."session_status_enum"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."session_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."session_status_enum_old" AS ENUM('active', 'paused', 'completed', 'cancelled', 'skipped')`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" TYPE "public"."session_status_enum_old" USING "status"::"text"::"public"."session_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."session_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."session_status_enum_old" RENAME TO "session_status_enum"`);
    }

}
