import {IExercise} from "./IExercise";

export interface ISubject {
    id: string;

    label: string;

    exercises: Array<IExercise>;
}