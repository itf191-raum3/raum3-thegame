import {Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {IExercise} from "@common/entities/IExercise";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Exercise implements IExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column("json")
    correctAnswers: Array<string>;
}