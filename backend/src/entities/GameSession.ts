import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "@/entities/Subject";
import {Exercise} from "@/entities/Exercise";

@Entity()
export class GameSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Subject)
    @JoinColumn()
    currentSubject: Subject;

    @Column({default: 1})
    maxDifficulty: number;

    @Column({default: 0})
    score: number;

    answered: Array<Exercise> = new Array<Exercise>();
}