import {IExercise} from "./IExercise";

export interface ISubject {
    id: string;

    label: string;

    IExercises: Array<IExercise>;
}