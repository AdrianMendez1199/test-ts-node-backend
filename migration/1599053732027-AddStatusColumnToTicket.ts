import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusColumnToTicket1599053732027 implements MigrationInterface {
    name = 'AddStatusColumnToTicket1599053732027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "ticket_status_enum" AS ENUM('E', 'R', 'A', 'I')`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "status" "ticket_status_enum" NOT NULL DEFAULT 'A'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "ticket_status_enum"`);
    }

}
