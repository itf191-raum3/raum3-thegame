import { ICloze } from '../../../../common/src/entities/ICloze';
import { IChoice } from '../../../../common/src/entities/IChoice';
import { IExercise } from '../../../../common/src/entities/IExercise';

export function isICloze(obj: IExercise): obj is ICloze {
  return 'isDropDown' in obj;
}

export function isIChoice(obj: IExercise): obj is IChoice {
  return 'isMultipleChoice' in obj;
}
