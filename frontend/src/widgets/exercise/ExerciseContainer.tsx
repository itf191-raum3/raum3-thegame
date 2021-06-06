import { checkCloze, fetchExercise } from 'api/APIUtils';
import { useCallback, useEffect, useState } from 'react';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { Loading } from 'widgets/common/Loading';
import { IExercise } from '../../../../common/src/entities/IExercise';
import { isIChoice, isICloze } from './ExerciseTypeGuards';

const subjectId = 'AE';

export function ExerciseContainer() {
  const [currentExercise, setCurrentExercise] = useState<IExercise | undefined>(undefined);

  const getNewExercise = useCallback(() => {
    setCurrentExercise(undefined);
    fetchExercise(subjectId)
      .then(setCurrentExercise)
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getNewExercise();
  }, [getNewExercise]);

  let content = <></>;
  if (!currentExercise) {
    content = <Loading />;
  } else if (isICloze(currentExercise)) {
    content = <ClozeWidget exercise={currentExercise} check={checkCloze} finish={getNewExercise} />;
  } else if (isIChoice(currentExercise)) {
    // choice;
  }

  return <>{content}</>;
}
