import {IExerciseService} from "@common/services/IExerciseService";
import {IExercise} from "@common/entities/IExercise";
import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";

export class ExerciseService implements IExerciseService {
    async createExercise(exercise: IExercise): Promise<void> {
        await getManager().insert(Exercise, exercise);
    }

    async deleteExercise(exercise: IExercise): Promise<void> {
        await getManager().delete<Exercise>(Exercise, exercise)
    }

    async editExercise(exercise: IExercise): Promise<void> {
        await getManager().save(Exercise, exercise);
    }

    async getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<Exercise>> {
        return await getManager().find(Exercise, {where: {subject: {label: subjectLabel}}});
    }

    async readExercise(id: string): Promise<IExercise> {
        //TODO: pls implement this @Justin
        return {
            id: "INVALID",
            label: "INVALID",
            difficulty: -1,
            correctAnswers: [],
            possibleAnswers: []
        };
    }

}