import {IExercise} from "../entities/IExercise";
import {Exercise} from "../../../backend/src/entities/Exercise";

export interface IExerciseService {
    createExercise(exercise: IExercise): Promise<void>;
    
    deleteExercise(id: string): Promise<void>;

    updateExercise(exercise: IExercise): Promise<void>;

    getExerciseById(id: string): Promise<IExercise>;

    getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<IExercise>>;

    getSubjectExercisesByDifficulty(subjectLabel: string, difficulty: number): Promise<Array<Exercise>>
}