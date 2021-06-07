import {GameSession} from "@/entities/GameSession";
import {Subject} from "@/entities/Subject";
import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {sample} from "lodash";
import {IGameSessionService} from "@common/services/IGameSessionService";

export class GameSessionService implements IGameSessionService {
    async createGameSession(subject: Subject): Promise<GameSession> {
        let gameSession;
        await getManager().insert(GameSession, {
            currentSubject: subject
        }).then(result => {
            gameSession = result.generatedMaps[0];
            console.log("gameSession", gameSession);
        });
        // @ts-ignore
        return gameSession;
    }

    async listGameSessions(): Promise<Array<GameSession>> {
        return await getManager().find<GameSession>(GameSession);
    }

    async getRandomExercise(gameSession: GameSession): Promise<Exercise | undefined> {
        const randomDifficulty = Math.random() * (gameSession.maxDifficulty - 1) + 1;
        const possibleExercises = gameSession.currentSubject.exercises.filter(exercise => !gameSession.answered.includes(exercise) && exercise.difficulty <= randomDifficulty);
        return sample(possibleExercises);
    }

    async getGameSessionById(id: string): Promise<GameSession> {
       return await getManager().findOneOrFail(GameSession, {where: {id: id}, relations: ["currentSubject", "currentSubject.exercises"]})
    }

    async saveGameSessions(gameSession: GameSession): Promise<void> {
        await getManager().save(gameSession);
    }
}