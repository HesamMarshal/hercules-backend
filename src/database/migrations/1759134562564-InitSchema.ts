import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1759134562564 implements MigrationInterface {
    name = 'InitSchema1759134562564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."measurement_type_f_take_enum" AS ENUM('goal', 'take')`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" SERIAL NOT NULL, "weight" integer, "height" integer, "body_fat_percentage" integer, "neck" integer, "shoulders" integer, "chest" integer, "left_bicep" integer, "right_bicep" integer, "left_forearm" integer, "right_forearm" integer, "upper_abs" integer, "waist" integer, "lower_abs" integer, "hips" integer, "left_thigh" integer, "right_thigh" integer, "left_calf" integer, "right_calf" integer, "type_f_take" "public"."measurement_type_f_take_enum" NOT NULL DEFAULT 'take', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" character varying, "order" integer, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "userId" integer, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_category_enum" AS ENUM('هالتر', 'دمبل', 'دستگاه', 'طناب', 'وزن بدن', 'وزن بدن با کمک', 'تکرار', 'کاردیو', 'استقامتی', 'Strength')`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_body_part_enum" AS ENUM('arms', 'back', 'chest', 'core', 'legs', 'shoulder', 'full_body', 'Olympic', 'cardio', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_exercise_type_enum" AS ENUM('فقط تکرار', 'تکرار با وزنه')`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "category" "public"."exercise_category_enum", "body_part" "public"."exercise_body_part_enum", "exercise_type" "public"."exercise_exercise_type_enum", "video_link" character varying, "instruction" character varying, "image" character varying, "image_key" character varying, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."practice_set_type_enum" AS ENUM('warmup', 'working', 'dropset', 'failure', 'cooldown')`);
        await queryRunner.query(`CREATE TYPE "public"."practice_status_enum" AS ENUM('planned', 'completed', 'skipped', 'failed')`);
        await queryRunner.query(`CREATE TABLE "practice" ("id" SERIAL NOT NULL, "order" integer NOT NULL DEFAULT '1', "set_number" integer NOT NULL DEFAULT '1', "previous_weight" numeric(8,2), "previous_reps" integer, "previous_time" integer, "previous_rest" integer, "current_weight" numeric(8,2), "current_reps" integer, "current_time" integer, "current_rest" integer, "set_type" "public"."practice_set_type_enum" NOT NULL DEFAULT 'working', "status" "public"."practice_status_enum" NOT NULL DEFAULT 'planned', "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "completed_at" TIMESTAMP, "workout_id" integer NOT NULL, "exercise_id" integer NOT NULL, CONSTRAINT "PK_4d094a10eae690da34cc5b8ea32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."workout_day_of_week_enum" AS ENUM('شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه')`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "name" character varying, "order" integer, "day_of_week" "public"."workout_day_of_week_enum", "planId" integer, "user_id" integer NOT NULL, "created_by" integer, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('client', 'trainer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying, "first_name" character varying, "last_name" character varying, "mobile" character varying, "mobile_verify" boolean DEFAULT false, "email" character varying, "invite_code" character varying, "agentId" integer, "birth_date" TIMESTAMP, "role" "public"."user_role_enum" NOT NULL, "score" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "otpId" integer, CONSTRAINT "UQ_29fd51e9cf9241d022c5a4e02e6" UNIQUE ("mobile"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_afbd6aa2cb8da01c11e1f9519f9" UNIQUE ("invite_code"), CONSTRAINT "REL_483a6adaf636e520039e97ef61" UNIQUE ("otpId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expires_in" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "image" character varying, "imageKey" character varying, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_e2c952d9d21c2899bfc69508300" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan" ADD CONSTRAINT "FK_827493784de956d80a17369b2c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_f0cfffd4e451f60e908692d52d0" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_e92af579b7b9236feacf264b722" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_3a7a248bdfe1e20779039c6de7c" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_483a6adaf636e520039e97ef617" FOREIGN KEY ("otpId") REFERENCES "otp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_483a6adaf636e520039e97ef617"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_3a7a248bdfe1e20779039c6de7c"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_e92af579b7b9236feacf264b722"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_f0cfffd4e451f60e908692d52d0"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_e406dafb8bf3c80482e6b83582c"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_b40e64af33d1f26ce943fe689a8"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_827493784de956d80a17369b2c0"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_e2c952d9d21c2899bfc69508300"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TYPE "public"."workout_day_of_week_enum"`);
        await queryRunner.query(`DROP TABLE "practice"`);
        await queryRunner.query(`DROP TYPE "public"."practice_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."practice_set_type_enum"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_exercise_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_body_part_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_category_enum"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`DROP TYPE "public"."measurement_type_f_take_enum"`);
    }

}
