import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSessionPractice1762962037397 implements MigrationInterface {
    name = 'UpdateSessionPractice1762962037397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice_set" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "practice_set" DROP COLUMN "reps"`);
        await queryRunner.query(`ALTER TABLE "practice_set" DROP COLUMN "duration_seconds"`);
        await queryRunner.query(`ALTER TABLE "practice_set" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "practice_set" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "weight" numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "reps" integer`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "duration_seconds" integer`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "completed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TYPE "public"."session_status_enum" RENAME TO "session_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."session_status_enum" AS ENUM('planned', 'active', 'paused', 'completed', 'cancelled', 'skipped')`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" TYPE "public"."session_status_enum" USING "status"::"text"::"public"."session_status_enum"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."session_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."session_status_enum_old" AS ENUM('planed', 'active', 'paused', 'completed', 'cancelled', 'skipped')`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" TYPE "public"."session_status_enum_old" USING "status"::"text"::"public"."session_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."session_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."session_status_enum_old" RENAME TO "session_status_enum"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "duration_seconds"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "reps"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD "completed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD "duration_seconds" integer`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD "reps" integer`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD "weight" numeric(8,2)`);
    }

}
