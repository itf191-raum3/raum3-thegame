import {IExercise} from "./IExercise";

export interface ISubject {
    id: string;

    IExercises: Array<IExercise>;
}