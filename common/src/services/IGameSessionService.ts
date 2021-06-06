import {Subject} from "../../../backend/src/entities/Subject";
import {GameSession} from "../../../backend/src/entities/GameSession";
import {Exercise} from "../../../backend/src/entities/Exercise";

export interface IGameSessionService {
    createGameSession(subject: Subject): Promise<GameSession>;

    getRandomExercise(gameSession: GameSession): Promise<Exercise | undefined>;
}