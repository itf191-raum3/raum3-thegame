import {IExercise} from "../entities/IExercise";

export interface IExerciseService {
    createExercise(exercise: IExercise): Promise<void>;
    
    deleteExercise(exercise: IExercise): Promise<void>;

    editExercise(exercise: IExercise): Promise<void>;

    getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<IExercise>> ;
}