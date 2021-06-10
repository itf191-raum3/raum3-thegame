import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Subject} from "@/entities/Subject";

@Entity()
export class GameSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @ManyToOne(() => Subject)
    @JoinColumn()
    currentSubject: Subject;

    @Column({default: 1})
    maxDifficulty: number;

    @Column({default: 0})
    score: number;

    @Column({ type: "json" })
    answered: Array<string>;

    @Column({default: 0})
    answeredAmount: number;
}