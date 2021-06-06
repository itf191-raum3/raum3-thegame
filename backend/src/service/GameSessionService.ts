import {GameSession} from "@/entities/GameSession";
import {Subject} from "@/entities/Subject";
import {getManager} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {sample} from "lodash";
import {IGameSessionService} from "@common/services/IGameSessionService";

export class GameSessionService implements IGameSessionService {
    async createGameSession(subject: Subject): Promise<GameSession> {
        let gameSession = new GameSession(subject);
        await getManager().insert(GameSession, gameSession);
        return gameSession;
    }

    async getRandomExercise(gameSession: GameSession): Promise<Exercise | undefined> {
        const randomDifficulty = Math.random() * (gameSession.maxDifficulty - 1) + 1;
        const possibleExercises = gameSession.currentSubject.exercises.filter(exercise => exercise.difficulty <= randomDifficulty);
        return sample(possibleExercises);
    }
}