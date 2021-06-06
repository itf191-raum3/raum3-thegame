import { ApiRoute } from "../../../types/common"
import { NextFunction, Request, Response } from "express";
import { ExerciseService } from "@/service/ExerciseService";
import { v4 as uuid } from "uuid";
import { Subject } from "@/entities/Subject";

const exerciseService = new ExerciseService();

export const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  //TODO: add to subject collection
  const exercise = {
    id: uuid(),
    label: req.body.label,
    difficulty: req.body.difficulty,
    correctAnswers: req.body.correctAnswers,
    possibleAnswers: req.body.possibleAnswers,
    subject: new Subject()
  }

  try {
    await exerciseService.createExercise(exercise);
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
    await exerciseService.updateExercise({
      id: <string>req.query.id,
      label: req.body.string,
      difficulty: req.body.difficulty,
      correctAnswers: req.body.correctAnswers,
      possibleAnswers: req.body.possibleAnswers,
      subject: new Subject()
    });
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