import {IExerciseService} from "@common/services/IExerciseService";
import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";

export class ExerciseService implements IExerciseService {
    async createExercise(exercise: Exercise): Promise<void> {
        await getManager().insert(Exercise, exercise);
    }

    async deleteExercise(id: string): Promise<void> {
        await getManager().delete<Exercise>(Exercise, await this.getExercise(id)); // this sucks
    }

    async editExercise(exercise: Exercise): Promise<void> {
        await getManager().save(Exercise, exercise);
    }

    async getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<Exercise>> {
        return await getManager().find(Exercise, {where: {subject: {label: subjectLabel}}});
    }

    async getExercise(id: string): Promise<Exercise> {
        return await getManager().findOneOrFail(Exercise, {where: {id: id}});
    }

}