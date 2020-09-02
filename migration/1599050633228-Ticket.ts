import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket1599050252676 implements MigrationInterface {
    name = 'Ticket1599050252676'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE "ticket" (
        "id" SERIAL NOT NULL, "title" character varying NOT NULL, 
        "description" character varying NOT NULL,
        "userId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(`
        ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" 
        FOREIGN KEY ("userId") REFERENCES "user"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
