import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {IExercise} from "@common/entities/IExercise";
import {Subject} from "@/entities/Subject";

@Entity()
@TableInheritance({column: {type: "varchar", name: "type"}})
export abstract class Exercise implements IExercise {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    label: string;

    @Column()
    difficulty: number;

    @Column("json")
    correctAnswers: Array<string>;

    @Column("json")
    possibleAnswers: Array<string>;

    @ManyToOne(() => Subject)
    @JoinColumn()
    subject: Subject;
}