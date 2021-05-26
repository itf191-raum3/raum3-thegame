import {IExercise} from "../entities/IExercise";

export interface IExerciseService {
    createExercise(exercise: IExercise): Promise<void>;
    
    deleteExercise(id: string): Promise<void>;

    editExercise(exercise: IExercise): Promise<void>;

    getExercise(id: string): Promise<IExercise>;

    getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<IExercise>> ;
}