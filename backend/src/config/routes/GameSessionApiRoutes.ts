import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import {GameSessionService} from "@/service/GameSessionService";
import {each, every, isEmpty, isUndefined, uniq} from "lodash";
import {ExerciseService} from "@/service/ExerciseService";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();
const exerciseService = new ExerciseService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.subjectLabel);
        const gameSession = await gameSessionService.createGameSession(subject, req.body.username);
        res.send(gameSession.id)
    } catch (err) {
        next(err);
    }
}


export const getNextExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSession = await gameSessionService.getGameSessionById(gameSessionId);
        const exercise = await gameSessionService.getRandomExercise(gameSession);

        if(!isUndefined(exercise)) {
            each(exercise.correctAnswers, (value, index) => {
                exercise.correctAnswers[index] = "";
            });
        }

        return res.send(exercise)
    } catch (err) {
        return next(err);
    }
}

export const getGameSessionStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSession = await gameSessionService.getGameSessionById(gameSessionId);

        return res.status(200).send({
            score: gameSession.score,
            maxDifficulty: gameSession.maxDifficulty,
            answeredAmount: gameSession.answeredAmount
        })
    } catch (err) {
        return next(err);
    }
}

export const getGameSessionsStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSessions = await gameSessionService.listGameSessions();
        // @ts-ignore
        const stats = [];
        each(gameSessions, e => {
            stats.push({
                username: e.username,
                score: e.score,
                maxDifficulty: e.maxDifficulty,
                answeredAmount: e.answeredAmount
            })
        })
        // @ts-ignore
        return res.status(200).send(stats)
    } catch (err) {
        return next(err);
    }
}


export const checkExerciseAnswers = async (req: Request, res: Response, next: NextFunction) => {
    const gameSessionId = req.params.gameSessionId;
    const gameSession = await gameSessionService.getGameSessionById(gameSessionId);
    try {
        const exercise = await exerciseService.getExerciseById(<string>req.params.exerciseId);
        const isCorrect: Array<Boolean> = [];

        each(req.body.answers, (answer, index: number) => {
            isCorrect.push(answer === exercise.correctAnswers[index]);
        });


        if (!isEmpty(isCorrect) && every(isCorrect)) {
            gameSession.answered.push(exercise.id);
            gameSession.answered = uniq(gameSession.answered);
            gameSession.score += exercise.difficulty * 360;
            gameSession.answeredAmount++;

            if (gameSession.answered.length >= 10) {
                gameSession.answered = [];
                gameSession.maxDifficulty++;
            }

            await gameSessionService.saveGameSessions(gameSession);
        }
        return res.send({
            answers: exercise.correctAnswers,
            isCorrect
        })
    } catch (err) {
        return next(err);
    }
}


export const gameSessionApi: Array<ApiRoute> = [
    {
        path: "/sessions/:subjectLabel/create",
        method: "POST",
        handler: createGameSession
    },
    {
        path: "/sessions/:gameSessionId/next",
        method: "GET",
        handler: getNextExercise
    },
    {
        path: "/sessions/:gameSessionId/stats",
        method: "GET",
        handler: getGameSessionStats
    },
    {
        path: "/sessions/stats",
        method: "GET",
        handler: getGameSessionsStats
    },
    {
        path: "/sessions/:gameSessionId/checkAnswers/:exerciseId",
        method: "POST",
        handler: checkExerciseAnswers
    }
]
