import {IExercise} from "../entities/IExercise";

export interface IExerciseService {
    createExercise(exercise: IExercise): Promise<void>;
    
    deleteExercise(id: string): Promise<void>;

    updateExercise(exercise: IExercise): Promise<void>;

    getExerciseById(id: string): Promise<IExercise>;

    getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<IExercise>>;
}