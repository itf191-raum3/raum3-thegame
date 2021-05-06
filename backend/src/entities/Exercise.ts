import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IExercise} from "@common/entities/IExercise";

@Entity()
export class Exercise implements IExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column("json")
    correctAnswers: Array<string>;
}