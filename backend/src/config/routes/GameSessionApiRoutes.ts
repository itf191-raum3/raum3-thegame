import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";
import {SubjectService} from "@/service/SubjectService";
import {GameSessionService} from "@/service/GameSessionService";
import {each} from "lodash";
import {ExerciseService} from "@/service/ExerciseService";
import {Exercise} from "@/entities/Exercise";

const subjectService = new SubjectService();
const gameSessionService = new GameSessionService();
const exerciseService = new ExerciseService();

export const createGameSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await subjectService.getSubjectByLabel(<string>req.params.subjectLabel);
        const gameSession = await gameSessionService.createGameSession(subject);
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

export const getGameSessionScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameSessionId = req.params.gameSessionId;
        const gameSession = await gameSessionService.getGameSessionById(gameSessionId);

        return res.status(200).send(gameSession.score.toString())
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


        if (isCorrect) {
            gameSession.answered.push(exercise);
            gameSession.score += exercise.difficulty * 360;

            if (gameSession.answered.length >= 3) { //TODO CHANGE BACK TO 10!
                console.log("DOOOOOONEE");
                console.log("DOOOOOONEE");
                console.log("DOOOOOONEE");
                console.log("DOOOOOONEE");
                console.log("DOOOOOONEE");
                console.log("DOOOOOONEE");
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
        path: "/session/:gameSessionId/score",
        method: "GET",
        handler: getGameSessionScore
    },
    {
        path: "/session/:gameSessionId/checkAnswers/:exerciseId",
        method: "POST",
        handler: checkExerciseAnswers
    }
]