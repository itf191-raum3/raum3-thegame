import { IExercise } from '../../../common/src/entities/IExercise';

export type CheckResponse = {
  answers: string[];
  isCorrect: boolean[];
};

function isCheckResponse(obj: any): obj is CheckResponse {
  return 'answers' in obj && 'isCorrect' in obj;
}

// TODO check routes
export function checkExercise(exercise: IExercise, sessionId: string): Promise<CheckResponse> {
  return fetch(`/api/exercise/${sessionId}/answers/${exercise.id}`, {
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
  return fetch(`api/session/${sessionId}`, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {
      console.log(json);
      throw new Error('Demo');
    });
}

export function initializeGameSession(subjectId: string): Promise<string> {
  return fetch(`/api/session/${subjectId}/create/`, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {
      if (typeof json.id === 'string') {
        return json.id;
      } else {
        throw new Error('GameSession could not be started: Invalid type');
      }
    });
}
