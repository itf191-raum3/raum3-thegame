import {ISubject} from "../entities/ISubject";

export interface ISubjectService {
    createSubject(subject: ISubject): Promise<void>;

    getSubjectById(id: string): Promise<ISubject>;

    getSubjectByLabel(label: string): Promise<ISubject>;

    deleteSubject(id: string): Promise<void>;

    updateSubject(subject: ISubject): Promise<void>;

    listSubjects(): Promise<Array<ISubject>>;
}