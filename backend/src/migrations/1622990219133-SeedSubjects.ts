import {getManager, MigrationInterface, QueryRunner} from "typeorm";
import {Subject} from "@/entities/Subject";

export class SeedSubjects1622990219133 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await getManager().insert(Subject, [
            {label: "AE"},
            {label: "ITS"},
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
