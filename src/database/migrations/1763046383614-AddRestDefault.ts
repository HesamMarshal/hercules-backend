import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRestDefault1763046383614 implements MigrationInterface {
    name = 'AddRestDefault1763046383614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "rest_duration" SET DEFAULT '60'`);
        await queryRunner.query(`ALTER TABLE "session_practice" ALTER COLUMN "rest_duration" SET DEFAULT '60'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_practice" ALTER COLUMN "rest_duration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "practice" ALTER COLUMN "rest_duration" DROP DEFAULT`);
    }

}
