import {ISubject} from "./ISubject";

export interface IExercise {
    id: string;

    label: string;

    difficulty: number;

    correctAnswers: Array<string>;

    possibleAnswers: Array<string>;

    subject: ISubject;
}