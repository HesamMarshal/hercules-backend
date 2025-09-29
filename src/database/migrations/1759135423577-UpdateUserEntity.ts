import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1759135423577 implements MigrationInterface {
    name = 'UpdateUserEntity1759135423577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'client'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
