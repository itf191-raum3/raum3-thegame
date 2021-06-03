import { ApiRoute } from "../../../types/common"
import { NextFunction, Request, Response } from "express";
import { SubjectService } from "@/service/SubjectService";
import { sample, isUndefined, each } from "lodash";

const subjectService = new SubjectService();

export const getAllSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await subjectService.listSubjects();
    return res.send({
      subjects: subjects
    })
  } catch (err) {
    return next(err);
  }
}

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

export const getRandomExerciseForSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectService.getSubjectById(<string>req.query.id);
    const exercise = sample(subject.IExercises);
    if(!isUndefined(exercise)) {
      const redactedAnswers: Array<string> = [];
      each(exercise.correctAnswers, () => {
        redactedAnswers.push("");
      });
      exercise.correctAnswers = redactedAnswers;
      return res.send({
        exercise: exercise
      });
    }
  } catch (err) {
    return next(err);
  }
}

export const subjectApi : Array<ApiRoute> = [
  {
    path: "/subjects",
    method: "GET",
    handler: getAllSubjects
  },
  {
    path: "/subject/exercises",
    method: "GET",
    handler: getExercisesForSubject
  },
  {
    path: "/subject/exercise",
    method: "GET",
    handler: getRandomExerciseForSubject
  },
]