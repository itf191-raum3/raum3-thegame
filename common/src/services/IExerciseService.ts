import {IExercise} from "../entities/IExercise";
import {IChoice} from "../entities/IChoice";
import {ICloze} from "../entities/ICloze";

export interface IExerciseService {
    createCloze(cloze: ICloze): Promise<void>;

    createChoice(choice: IChoice): Promise<void>;

    deleteExercise(id: string): Promise<void>;

    updateCloze(cloze: ICloze): Promise<void>;

    updateChoice(choice: IChoice): Promise<void>;

    getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<IExercise>>;

    getExerciseById(id: string): Promise<IExercise>;
}