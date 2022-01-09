import {MigrationInterface, QueryRunner} from "typeorm";

export class Customers1641736297546 implements MigrationInterface {
    name = 'Customers1641736297546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ...
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropTable('customers');
    }

}
