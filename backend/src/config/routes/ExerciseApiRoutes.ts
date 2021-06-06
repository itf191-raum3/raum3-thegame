import { ApiRoute } from "../../../types/common"
import { NextFunction, Request, Response } from "express";
import { ExerciseService } from "@/service/ExerciseService";
import { v4 as uuid } from "uuid";
import { each } from "lodash";
import { SubjectService } from "@/service/SubjectService";

const exerciseService = new ExerciseService();
const subjectService = new SubjectService();

export const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectService.getSubjectById(<string>req.query.id);

    const exercise = {
      id: uuid(),
      label: req.body.label,
      difficulty: req.body.difficulty,
      correctAnswers: req.body.correctAnswers,
      possibleAnswers: req.body.possibleAnswers,
      subject: subject
    }

    switch(req.query.exerciseType) {
      case "IChoice":
        await exerciseService.createChoice({
          ...exercise,
          isMultipleChoice: req.body.isMultipleChoice
        });
        break;
      case "ICloze":
        await exerciseService.createCloze({
          ...exercise,
          isDropDown: req.body.isDropDown
        });
        break;
    }
  } catch (err) {
    return next(err);
  }
  return res.sendStatus(200);
};

export const readExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseService.getExerciseById(<string>req.query.id);
    return res.send(exercise);
  } catch (err) {
    return next(err);
  }
};

export const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseService.getExerciseById(<string>req.query.id);
    const updatedExercise = {
      id: <string>req.query.id,
      label: req.body.string,
      difficulty: req.body.difficulty,
      correctAnswers: req.body.correctAnswers,
      possibleAnswers: req.body.possibleAnswers,
      subject: exercise.subject
    };

    switch(req.query.exerciseType) {
      case "IChoice":
        await exerciseService.updateChoice({
          ...updatedExercise,
          isMultipleChoice: req.body.isMultipleChoice
        });
        break;
      case "ICloze":
        await exerciseService.updateCloze({
          ...updatedExercise,
          isDropDown: req.body.isDropDown
        });
        break;
    }
  } catch (err) {
    return next(err);
  }

  return res.sendStatus(200);
};

export const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await exerciseService.deleteExercise(<string>req.query.id);
  } catch (err) {
    return next(err);
  }
  return res.sendStatus(200);
};

export const checkExerciseAnswers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseService.getExerciseById(<string>req.query.id);
    const isCorrect: Array<Boolean> = [];

    each(req.body.answers, (answer, index: number) => {
      isCorrect.push(answer === exercise.correctAnswers[index]);
    })

    res.send({
      answers: exercise.correctAnswers,
      isCorrect
    })
  } catch (err) {
    return next(err);
  }
}

export const exerciseApi : Array<ApiRoute> = [
  {
    path: "/exercise",
    method: "POST",
    handler: createExercise
  },
  {
    path: "/exercise",
    method: "GET",
    handler: readExercise
  },
  {
    path: "/exercise",
    method: "PUT",
    handler: updateExercise
  },
  {
    path: "/exercise",
    method: "DELETE",
    handler: deleteExercise
  }
]