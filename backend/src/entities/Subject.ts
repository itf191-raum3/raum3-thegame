import {ISubject} from "@common/entities/ISubject";
import {Exercise} from "@/entities/Exercise";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Subject implements ISubject {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    label: string;

    @OneToMany(() => Exercise, exercise => exercise.subject)
    exercises: Array<Exercise>;
}