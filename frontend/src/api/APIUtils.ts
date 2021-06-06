import { ICloze } from '../../../common/src/entities/ICloze';
import { IExercise } from '../../../common/src/entities/IExercise';

export type CheckResponse = {
  answers: string[];
  isCorrect: boolean[];
};

function isCheckResponse(obj: any): obj is CheckResponse {
  return 'answers' in obj && 'isCorrect' in obj;
}

// TODO check routes
export function checkCloze(clozeExercise: ICloze, sessionId: string): Promise<CheckResponse> {
  return fetch(`exercise/${sessionId}/?id=${clozeExercise.id}`, {
    method: 'POST',
    body: JSON.stringify({ answers: clozeExercise.correctAnswers }),
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
  return fetch(`/exercise/${sessionId}/next`, {
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

export function initializeGameSession(subjectId: string): Promise<string> {
  return fetch('session/create', { method: 'GET', body: JSON.stringify({ subject: subjectId }) })
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
