import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {Cloze} from "@/entities/Cloze";
import {Choice} from "@/entities/Choice";
import {IExerciseService} from "@common/services/IExerciseService";

export class ExerciseService implements IExerciseService {
    async createCloze(cloze: Cloze): Promise<void> {
        await getManager().insert(Cloze, cloze);
    }

    async createChoice(choice: Choice): Promise<void> {
        await getManager().insert(Choice, choice);
    }

    async deleteExercise(id: string): Promise<void> {
        await getManager().delete<Exercise>(Exercise, {id: id})
    }

    async updateCloze(cloze: Cloze): Promise<void> {
        await getManager().save(Cloze, cloze);
    }

    async updateChoice(choice: Choice): Promise<void> {
        await getManager().save(Choice, choice);
    }

    async getSubjectExercisesByLabel(subjectLabel: string): Promise<Array<Exercise>> {
        return await getManager().find(Exercise, {where: {subject: {label: subjectLabel}}, relations: ["subject"]});
    }

    async getExerciseById(id: string): Promise<Exercise> {
        return await getManager().findOneOrFail(Exercise, {id: id}, {relations: ["subject"]});
    }
}