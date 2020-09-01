import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameAndPasswordColumnsToUser1596848922293 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD COLUMN username VARCHAR(100),
            ADD COLUMN password VARCHAR(100);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
    }

}
