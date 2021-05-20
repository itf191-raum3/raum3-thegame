import {IExercise} from "./IExercise";

export interface ICloze extends IExercise {
    options: Array<string>;

    isMultipleChoice: boolean;
}