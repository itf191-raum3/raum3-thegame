import { ApiRoute } from "../../../types/common"
import { NextFunction, Request, Response } from "express";
import { SubjectService } from "@/service/SubjectService";

const subjectService = new SubjectService();

export const getExercisesForSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectService.getSubjectById(<string>req.query.id);
    return res.send({
      exercises: subject.IExercises
    });
  } catch (err) {
    return next(err);
  }
};

export const subjectApi : Array<ApiRoute> = [
  {
    path: "/subject/exercises",
    method: "GET",
    handler: getExercisesForSubject
  }
]