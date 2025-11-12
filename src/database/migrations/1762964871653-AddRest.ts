import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRest1762964871653 implements MigrationInterface {
    name = 'AddRest1762964871653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" RENAME COLUMN "target_rest" TO "rest_duration"`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "rest_duration" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "rest_duration"`);
        await queryRunner.query(`ALTER TABLE "practice" RENAME COLUMN "rest_duration" TO "target_rest"`);
    }

}
