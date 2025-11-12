import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRestDefault1762964952527 implements MigrationInterface {
    name = 'AddRestDefault1762964952527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" RENAME COLUMN "target_rest" TO "rest_duration"`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD "rest_duration" integer DEFAULT '60'`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "rest_duration" SET DEFAULT '60'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "rest_duration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session_practice" DROP COLUMN "rest_duration"`);
        await queryRunner.query(`ALTER TABLE "practice" RENAME COLUMN "rest_duration" TO "target_rest"`);
    }

}
