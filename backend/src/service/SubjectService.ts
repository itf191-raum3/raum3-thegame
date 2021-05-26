import {Subject} from "@/entities/Subject";
import {ISubjectService} from "@common/services/ISubjectService";
import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";

export class SubjectService implements ISubjectService {
    async createSubject(subject: Subject): Promise<void> {
        await getManager().insert(Subject, subject);
    }

    async deleteSubject(id: string): Promise<void> {
        await getManager().delete<Exercise>(Exercise, await this.getSubjectById(id)); // this sucks
    }

    async getSubjectById(id: string): Promise<Subject> {
        return await getManager().findOneOrFail<Subject>(Subject, {where: {id: id}});
    }

    async updateSubject(subject: Subject): Promise<void> {
        await getManager().save(Subject, subject);
    }

    async listSubjects(): Promise<Array<Subject>> {
        return await getManager().find<Subject>(Subject);
    }
}