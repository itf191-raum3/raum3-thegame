import { checkCloze, fetchExercise } from 'api/APIUtils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { Loading } from 'widgets/common/Loading';
import { SessionContext } from 'widgets/sessionContext/SessionContext';
import { IExercise } from '../../../../common/src/entities/IExercise';
import { isIChoice, isICloze } from './ExerciseTypeGuards';

const subjectId = 'AE';

export function ExerciseContainer() {
  const [currentExercise, setCurrentExercise] = useState<IExercise | undefined>(undefined);

  const sessionManager = useContext(SessionContext);

  const getNewExercise = useCallback(() => {
    setCurrentExercise(undefined);
    if (sessionManager) {
      fetchExercise(subjectId, sessionManager.sessionId)
        .then(setCurrentExercise)
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sessionManager]);

  useEffect(() => {
    getNewExercise();
  }, [getNewExercise]);

  let content = <></>;
  if (!currentExercise || !sessionManager) {
    content = <Loading />;
  } else if (isICloze(currentExercise)) {
    content = (
      <ClozeWidget
        exercise={currentExercise}
        check={(e) => checkCloze(e, sessionManager.sessionId)}
        finish={getNewExercise}
      />
    );
  } else if (isIChoice(currentExercise)) {
    // choice;
  }

  return <>{content}</>;
}
