import { IChoice } from '../../../../common/src/entities/IChoice';

export function requestChoiceExerciseFromBackend(myChoiceExercise: IChoice)
{
    return fetch('localhost/exercise', { method: 'GET', body: JSON.stringify({myChoiceExercise})})
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response.status + ' ' + response.statusText);
        }
      })
      .then((json) => {
        if (Array.isArray(json) && typeof json[0] === 'string') {
          return json as string[];
        } else {
          return Promise.reject('The Format is not supported');
        }
      });
    }