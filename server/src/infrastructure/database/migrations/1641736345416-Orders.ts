import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Orders1641736345416 implements MigrationInterface {
    name = 'Orders1641736345416'

    table_name = 'orders';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(new Table({
        //     name: this.table_name,
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //         }
        //     ]
        // }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropTable(this.table_name);
    }

}
