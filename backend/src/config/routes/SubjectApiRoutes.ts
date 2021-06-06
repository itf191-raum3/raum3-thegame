import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";

const subjectService = new SubjectService();

export const getAllSubjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects = await subjectService.listSubjects();
        return res.send(subjects)
    } catch (err) {
        return next(err);
    }
}

export const getSubjectByLabel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(req.params.label);
        return res.send(subject)
    } catch (err) {
        return next(err);
    }
}

export const subjectApi: Array<ApiRoute> = [
    {
        path: "/subjects",
        method: "GET",
        handler: getAllSubjects
    },
    {
        path: "/subjects/:label",
        method: "GET",
        handler: getSubjectByLabel
    },
]