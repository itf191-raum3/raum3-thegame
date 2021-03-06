import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {ExerciseService} from "@/service/ExerciseService";
import {v4 as uuid} from "uuid";
import {each, find, isUndefined} from "lodash";
import {SubjectService} from "@/service/SubjectService";
import {GameSessionService} from "@/service/GameSessionService";

const exerciseService = new ExerciseService();
const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();

export const createExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.label);

        const exercise = {
            id: uuid(),
            label: req.body.label,
            difficulty: req.body.difficulty,
            correctAnswers: req.body.correctAnswers,
            possibleAnswers: req.body.possibleAnswers,
            subject: subject
        }

        switch (req.query.exerciseType) {
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
        const exercise = await exerciseService.getExerciseById(<string>req.params.id);
        return res.send(exercise);
    } catch (err) {
        return next(err);
    }
};

export const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercise = await exerciseService.getExerciseById(<string>req.params.id);
        const updatedExercise = {
            id: <string>req.params.id,
            label: req.body.label,
            difficulty: req.body.difficulty,
            correctAnswers: req.body.correctAnswers,
            possibleAnswers: req.body.possibleAnswers,
            subject: exercise.subject
        };

        switch (req.query.exerciseType) {
            case "IChoice":
                await exerciseService.updateChoice({
                    ...updatedExercise,
                    isMultipleChoice: updatedExercise.correctAnswers.length > 1
                });
                break;
            case "ICloze":
                await exerciseService.updateCloze({
                    ...updatedExercise,
                    isDropDown: updatedExercise.possibleAnswers.length > 0
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
        await exerciseService.deleteExercise(<string>req.params.id);
    } catch (err) {
        return next(err);
    }
    return res.sendStatus(200);
};

export const exerciseApi: Array<ApiRoute> = [
    {
        path: "/exercise/:label/create",
        method: "POST",
        handler: createExercise
    },
    {
        path: "/exercise/:id",
        method: "GET",
        handler: readExercise
    },
    {
        path: "/exercise/:id/update",
        method: "POST",
        handler: updateExercise
    },
    {
        path: "/exercise/:id/delete",
        method: "DELETE",
        handler: deleteExercise
    }
]
