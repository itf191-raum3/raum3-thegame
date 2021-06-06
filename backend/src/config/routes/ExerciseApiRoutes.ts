import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {ExerciseService} from "@/service/ExerciseService";
import {v4 as uuid} from "uuid";
import {each, find, isUndefined} from "lodash";
import {SubjectService} from "@/service/SubjectService";
import {gameSessions, GameSessionService} from "@/service/GameSessionService";

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
        await exerciseService.deleteExercise(<string>req.params.id);
    } catch (err) {
        return next(err);
    }
    return res.sendStatus(200);
};

export const checkExerciseAnswers = async (req: Request, res: Response, next: NextFunction) => {
    const gameSessionId = req.params.gameSessionId;
    const gameSession = find(gameSessions, ['id', gameSessionId]);
    try {
        if (isUndefined(gameSession)) {
            return next("GameSession not found");
        }

        const exercise = await exerciseService.getExerciseById(<string>req.params.id);
        const isCorrect: Array<Boolean> = [];

        each(req.body.answers, (answer, index: number) => {
            isCorrect.push(answer === exercise.correctAnswers[index]);
        });

        gameSession.answered.push(exercise);
        gameSession.score += exercise.difficulty * 360;

        return res.send({
            answers: exercise.correctAnswers,
            isCorrect
        })
    } catch (err) {
        return next(err);
    }
}

export const getNextExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSession = find(gameSessions, ['id', gameSessionId]);

        if (isUndefined(gameSession)) {
            return next("GameSession not found");
        }

        const exercise = await gameSessionService.getRandomExercise(gameSession);
        return res.send({
            exercise: exercise
        })
    } catch (err) {
        return next(err);
    }
}

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
    },
    {
        path: "/exercise/:gameSessionId/answers",
        method: "POST",
        handler: checkExerciseAnswers
    },
    {
        path: "/exercise/:gameSessionId/next",
        method: "GET",
        handler: getNextExercise
    }
]