import {IExercise} from "./IExercise";

export interface IChoice extends IExercise {
    options: Array<string>

    isDropDown: boolean
}