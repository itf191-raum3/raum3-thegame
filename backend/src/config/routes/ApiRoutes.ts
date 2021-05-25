import { ApiRoute } from "../../../types/common"
import { Request, Response } from "express"
import { ExerciseService } from "@/service/ExerciseService";
import { v4 as uuid } from "uuid";

const exerciseService = new ExerciseService();

export const createExercise = async (req: Request, res: Response) => {
  //TODO: add to subject collection
  const exercise = {
    id: uuid(),
    label: req.body.label,
    difficulty: req.body.difficulty,
    correctAnswers: req.body.correctAnswers,
    possibleAnswers: req.body.possibleAnswers
  }
  await exerciseService.createExercise(exercise);

  res.sendStatus(200); //TODO: Error handling
};

export const readExercise = async (req: Request, res: Response) => {
  const exercise = await exerciseService.readExercise(<string> req.query.id);
  res.send(exercise); //TODO: redact correct answers
};

export const updateExercise = async (req: Request, res: Response) => {
  await exerciseService.editExercise({
    id: <string> req.query.id,
    label: req.body.string,
    difficulty: req.body.difficulty,
    correctAnswers: req.body.correctAnswers,
    possibleAnswers: req.body.possibleAnswers
  });

  res.sendStatus(200); //TODO: Error handling
};

export const deleteExercise = async (req: Request, res: Response) => {
  //TODO: clear up if read is necessary
  const exercise = await exerciseService.readExercise(<string> req.query.id);
  await exerciseService.deleteExercise(exercise);
  res.sendStatus(200); //TODO: Error handling
};

export const getExercisesForSubject = async (req: Request, res: Response) => {
  //TODO: wait for SubjectService @Justin
  res.sendStatus(501);
};

export const api : Array<ApiRoute> = [
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
  },
  {
    path: "/subject/exercises",
    method: "GET",
    handler: getExercisesForSubject
  }
]