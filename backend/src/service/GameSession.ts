import {ExerciseService} from "@/service/ExerciseService";
import {Exercise} from "@/entities/Exercise";

export class GameSession {
    gameSessionId: string;
    currentSubject: string;
    currentDifficulty: number;
    exercisePool: Array<Exercise>;

    private exerciseService: ExerciseService = new ExerciseService();

    constructor(sessionId: string, currentSubject: string) {
        this.gameSessionId = sessionId;
        this.currentSubject = currentSubject;
    }

    async getNextExercise(): Promise<Exercise | undefined> {
        if(this.currentDifficulty > 10)
            return undefined;

        if (this.exercisePool.length == 0)
            this.exercisePool = await this.exerciseService.getSubjectExercisesByDifficulty(this.currentSubject, ++this.currentDifficulty);

        return <Exercise>this.exercisePool.pop();
    }
}