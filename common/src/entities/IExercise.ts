export interface IExercise {
    id: string;

    label: string;

    difficulty: number;

    correctAnswers: Array<string>;

    possibleAnswers: Array<string>;
}