import {ISubject} from "@common/entities/ISubject";
import {Exercise} from "@/entities/Exercise";
import {OneToMany, PrimaryGeneratedColumn} from "typeorm";

export class Subject implements ISubject {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Exercise, exercise => exercise.subject)
    IExercises: Array<Exercise>;
}