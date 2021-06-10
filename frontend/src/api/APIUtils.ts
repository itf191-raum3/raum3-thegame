import { IExercise } from '../../../common/src/entities/IExercise';

export type CheckResponse = {
  answers: string[];
  isCorrect: boolean[];
};

export type GameSessionStatsResponse = {
  username: string;
  score: number;
  maxDifficulty: number;
  answeredAmount: number;
};

function isCheckResponse(obj: any): obj is CheckResponse {
  return 'answers' in obj && 'isCorrect' in obj;
}

export function checkExercise(exercise: IExercise, sessionId: string): Promise<CheckResponse> {
  return fetch(`/api/sessions/${sessionId}/checkAnswers/${exercise.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers: exercise.correctAnswers }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {
      if (isCheckResponse(json)) {
        return json;
      } else {
        return Promise.reject('Unsupported Format');
      }
    });
}

export async function fetchExercise(sessionId: string): Promise<IExercise> {
  return fetch(`/api/sessions/${sessionId}/next`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {
      return json as IExercise;
    });
}

export type SessionStats = { score: number; maxDifficulty: number };

export function fetchCurrentStats(sessionId: string): Promise<SessionStats> {
  return fetch(`api/sessions/${sessionId}/stats`, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((score) => {
      return score as SessionStats;
    });
}

export function initializeGameSession(username: string, subjectId: string): Promise<string> {
  return fetch(`/api/sessions/${subjectId}/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((id) => {
      return id;
    });
}

export function getGameSessions(): Promise<Array<GameSessionStatsResponse>> {
  return fetch(`/api/sessions/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((id) => {
      return id;
    });
}

export function checkPassword(password: string): Promise<boolean> {
  return fetch('/auth', {
    method: 'POST',
    body: JSON.stringify({ password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.ok;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
}
