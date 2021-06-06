import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "@/entities/Subject";
import {Exercise} from "@/entities/Exercise";

@Entity()
export class GameSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Subject)
    @JoinColumn()
    currentSubject: Subject;

    @Column({default: 1})
    maxDifficulty: number;

    @Column({default: 0})
    score: number;

    answered: Array<Exercise>;
}