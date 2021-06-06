import {getManager, MigrationInterface, QueryRunner} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {Subject} from "@/entities/Subject";
import {Choice} from "@/entities/Choice";

export class SeedExercise1622994244231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const subject = await getManager().findOneOrFail(Subject, {where: {label: "AE"}});
        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Bist du dum?",
            correctAnswers: ['ja'],
            possibleAnswers: ['ja', 'nein'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Was ist 1+1?",
            correctAnswers: ['ja'],
            possibleAnswers: ['2', '11', 'ja'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Was ist ein Array?",
            correctAnswers: ['ja'],
            possibleAnswers: ['ein Unterwasser Flugzeug', 'Irgendwas mit Programmieren oder so'],
            subject: subject,
            isMultipleChoice: false
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
