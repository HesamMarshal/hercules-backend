import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadePracticeSet1763134768154 implements MigrationInterface {
    name = 'AddCascadePracticeSet1763134768154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_practice" DROP CONSTRAINT "FK_220b7e1cc8515da147d89920a6e"`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD CONSTRAINT "FK_220b7e1cc8515da147d89920a6e" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_practice" DROP CONSTRAINT "FK_220b7e1cc8515da147d89920a6e"`);
        await queryRunner.query(`ALTER TABLE "session_practice" ADD CONSTRAINT "FK_220b7e1cc8515da147d89920a6e" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
