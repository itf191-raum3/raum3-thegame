import { IExercise } from '../../../common/src/entities/IExercise';

export type CheckResponse = {
  answers: string[];
  isCorrect: boolean[];
};

function isCheckResponse(obj: any): obj is CheckResponse {
  return 'answers' in obj && 'isCorrect' in obj;
}

export function checkExercise(exercise: IExercise, sessionId: string): Promise<CheckResponse> {
  return fetch(`/api/session/${sessionId}/checkAnswers/${exercise.id}`, {
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
  return fetch(`/api/session/${sessionId}/next`, {
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

export function fetchCurrentScore(sessionId: string): Promise<number> {
  return fetch(`api/session/${sessionId}/score`, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((score) => {
      return +score;
    });
}

export function initializeGameSession(subjectId: string): Promise<string> {
  return fetch(`/api/session/${subjectId}/create/`, { method: 'POST' })
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
