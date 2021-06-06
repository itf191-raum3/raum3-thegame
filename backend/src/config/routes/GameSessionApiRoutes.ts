import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import {gameSessions, GameSessionService} from "@/service/GameSessionService";
import {find, isUndefined} from "lodash";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.subjectLabel);
        const gameSession = await gameSessionService.createGameSession(subject);
        gameSessions.push(gameSession);
        res.send(gameSession.id)
    } catch (err) {
        next(err);
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
        return res.send(exercise)
    } catch (err) {
        return next(err);
    }
}

export const getGameSessionScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSession = find(gameSessions, ['id', gameSessionId]);

        if (isUndefined(gameSession)) {
            return next("GameSession not found");
        }

        return res.send(gameSession.score)
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
        path: "/session/:gameSessionId/score",
        method: "GET",
        handler: getGameSessionScore
    }
]