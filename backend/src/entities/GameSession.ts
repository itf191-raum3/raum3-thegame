import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "@/entities/Subject";

@Entity()
export class GameSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    currentSubject: Subject;

    @Column()
    maxDifficulty: number;

    @Column()
    score: number;
}