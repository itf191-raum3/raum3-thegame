import { ICloze } from '../../../../common/src/entities/ICloze';

export function checkCloze(clozeExercise: ICloze) {
  return fetch('localhost/', { method: 'GET', body: JSON.stringify({ clozeExercise }) })
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
        return Promise.reject('Unsupported Format');
      }
    });
}
