import {ExerciseService} from "@/service/ExerciseService";
import {Exercise} from "@/entities/Exercise";

export class GameSession {
    sessionId: string;
    exercisesDone: number;
    currentSubject: string;
    currentDifficulty: number;
    exercisePool: Array<Exercise>;

    private exerciseService: ExerciseService = new ExerciseService();

    constructor(currentSubject: string) {
        this.currentSubject = currentSubject;
    }

    async getNextExercise(): Promise<Exercise> {
        if (this.exercisePool.length == 0) {
            this.currentDifficulty++;
            this.exercisePool = await this.exerciseService.getSubjectExercisesByDifficulty(this.currentSubject, this.currentDifficulty);
        }
        return <Exercise>this.exercisePool.pop();
    }
}