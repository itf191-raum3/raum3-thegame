import { ICloze } from '../../../common/src/entities/ICloze';
import { IExercise } from '../../../common/src/entities/IExercise';

export type CheckResponse = {
  answers: string[];
  isCorrect: boolean[];
};

function isCheckResponse(obj: any): obj is CheckResponse {
  return 'answers' in obj && 'isCorrect' in obj;
}

export function checkCloze(clozeExercise: ICloze): Promise<CheckResponse> {
  // TODO use correct route
  return fetch('/' + clozeExercise.id, {
    method: 'GET',
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

export function fetchExercise(subjectId: string): Promise<IExercise> {
  return fetch('/subject/exercise?id=' + subjectId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
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

export function initializeGameSession(): Promise<string> {
  return fetch('initialize', { method: 'GET' })
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
