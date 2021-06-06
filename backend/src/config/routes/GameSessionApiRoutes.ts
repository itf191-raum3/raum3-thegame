import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import {gameSessions, GameSessionService} from "@/service/GameSessionService";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.subjectLabel);
        const gameSession = await gameSessionService.createGameSession(subject);
        gameSessions.push(gameSession);
        res.send({
            gameSessionId: gameSession.id
        })
    } catch (err) {
        next(err);
    }
}

export const gameSessionApi: Array<ApiRoute> = [
    {
        path: "/session/create/:subjectLabel",
        method: "GET",
        handler: createGameSession
    }
]