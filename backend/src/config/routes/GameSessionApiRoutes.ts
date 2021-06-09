import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import {GameSessionService} from "@/service/GameSessionService";
import {each, every, isEmpty} from "lodash";
import {ExerciseService} from "@/service/ExerciseService";
import {Exercise} from "@/entities/Exercise";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();
const exerciseService = new ExerciseService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.subjectLabel);
        console.log("req.body.username", req.body.username);
        const gameSession = await gameSessionService.createGameSession(<string>req.body.username, subject);
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
            maxDifficulty: gameSession.score
        });
    } catch (err) {
        return next(err);
    }
}

export const listGameSessionStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessions = await gameSessionService.listGameSessions();
        // @ts-ignore
        const sessionsTruncated = [];
        each(gameSessions, e => {
            sessionsTruncated.push({
                username: e.username,
                score: e.score,
                maxDifficulty: e.maxDifficulty
            })
        });
        // @ts-ignore
        return res.status(200).send(sessionsTruncated)
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
            gameSession.answered.push(exercise);
            gameSession.score += exercise.difficulty * 360;

            if (gameSession.answered.length >= 5) { //TODO CHANGE BACK TO 10!
                gameSession.answered = Array<Exercise>();
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
        path: "/session/:subjectLabel/create",
        method: "POST",
        handler: createGameSession
    },
    {
        path: "/session/:gameSessionId/next",
        method: "GET",
        handler: getNextExercise
    },
    {
        path: "/session/:gameSessionId/stats",
        method: "GET",
        handler: getGameSessionStats
    },
    {
        path: "/session/stats",
        method: "GET",
        handler: listGameSessionStats
    },
    {
        path: "/session/:gameSessionId/checkAnswers/:exerciseId",
        method: "POST",
        handler: checkExerciseAnswers
    }
]
