import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import { gameSessions, GameSessionService } from "@/service/GameSessionService";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectById(<string>req.query.subject);
        const gameSession = await gameSessionService.createGameSession(subject);
        gameSessions.push(gameSession);
        res.send({
            gameSessionId: gameSession.id
        })
    } catch (err) {
        next(err);
    }
}

export const exerciseApi: Array<ApiRoute> = [
    {
        path: "/session/create",
        method: "GET",
        handler: createGameSession
    }
]