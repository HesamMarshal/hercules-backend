import { MigrationInterface, QueryRunner } from "typeorm";

export class Session1762784034842 implements MigrationInterface {
    name = 'Session1762784034842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c"`);
        await queryRunner.query(`CREATE TYPE "public"."session_status_enum" AS ENUM('active', 'paused', 'completed', 'cancelled', 'skipped')`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP, "status" "public"."session_status_enum" NOT NULL DEFAULT 'active', "last_paused_at" TIMESTAMP, "total_pause_seconds" integer NOT NULL DEFAULT '0', "last_resumed_at" TIMESTAMP, "duration_seconds" integer, "notes" text, "total_volume" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "workout_id" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "practice_set" ("id" SERIAL NOT NULL, "set_number" integer NOT NULL, "weight" numeric(8,2), "reps" integer, "duration_seconds" integer, "completed" boolean NOT NULL DEFAULT false, "completed_at" TIMESTAMP, "rest_taken_seconds" integer, "rpe" integer, "volume" numeric(10,2), "session_practice_id" integer, CONSTRAINT "PK_496e2968c345b177d564726a0c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session_practice" ("id" SERIAL NOT NULL, "order_index" integer NOT NULL, "notes" text, "total_volume" numeric(10,2), "best_set_weight" integer, "session_id" integer, "practice_id" integer, "exercise_id" integer, CONSTRAINT "PK_799135b88e5b20ff43e6a69ece9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "previous_weight"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "previous_reps"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "previous_time"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "previous_rest"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "current_weight"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "current_reps"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "current_time"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "current_rest"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."practice_status_enum"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "target_sets" integer NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "target_reps" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "target_weight" numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "target_duration" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "target_rest" integer`);
        await queryRunner.query(`ALTER TABLE "workout" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "workout_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "exercise_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a2877fb3a44efe642c262740878" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice_set" ADD CONSTRAINT "FK_2c570d000b8e1eb3baa188746fa" FOREIGN KEY ("session_practice_id") REFERENCES "session_practice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD CONSTRAINT "FK_220b7e1cc8515da147d89920a6e" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD CONSTRAINT "FK_30a03b4ec892458b6418d448561" FOREIGN KEY ("practice_id") REFERENCES "practice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD CONSTRAINT "FK_a8f1cc46ddd8681fa65c14038ab" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP CONSTRAINT "FK_a8f1cc46ddd8681fa65c14038ab"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP CONSTRAINT "FK_30a03b4ec892458b6418d448561"`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP CONSTRAINT "FK_220b7e1cc8515da147d89920a6e"`);
        await queryRunner.query(`ALTER TABLE "practice_set" DROP CONSTRAINT "FK_2c570d000b8e1eb3baa188746fa"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a2877fb3a44efe642c262740878"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "exercise_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "workout_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "target_rest"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "target_duration"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "target_weight"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "target_reps"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP COLUMN "target_sets"`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "completed_at" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."practice_status_enum" AS ENUM('planned', 'completed', 'skipped', 'failed')`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "status" "public"."practice_status_enum" NOT NULL DEFAULT 'planned'`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "current_rest" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "current_time" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "current_reps" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "current_weight" numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "previous_rest" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "previous_time" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "previous_reps" integer`);
        await queryRunner.query(`ALTER TABLE "practice" ADD "previous_weight" numeric(8,2)`);
        await queryRunner.query(`DROP TABLE "session_practice"`);
        await queryRunner.query(`DROP TABLE "practice_set"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TYPE "public"."session_status_enum"`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
