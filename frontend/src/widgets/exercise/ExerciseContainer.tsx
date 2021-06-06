import { checkExercise, fetchCurrentScore, fetchExercise } from 'api/APIUtils';
import { useCallback, useEffect, useState } from 'react';
import { ChoiceWidget } from 'widgets/choice/ChoiceWidget';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { Loading } from 'widgets/common/Loading';
import { getSessionId } from 'widgets/sessionContext/SessionContext';
import { IExercise } from '../../../../common/src/entities/IExercise';
import { isIChoice, isICloze } from './ExerciseTypeGuards';

const subjectId = 'AE';

export function ExerciseContainer() {
  const [currentExercise, setCurrentExercise] = useState<IExercise | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [score, setScore] = useState<number>(0);

  const getNewExercise = useCallback(() => {
    setCurrentExercise(undefined);
    if (sessionId) {
      fetchExercise(sessionId)
        .then(setCurrentExercise)
        .catch((e) => console.log(e));
      fetchCurrentScore(sessionId)
        .then(setScore)
        .catch((e) => console.log(e));
    }
  }, [sessionId]);

  useEffect(() => {
    getSessionId(subjectId)
      .then(setSessionId)
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getNewExercise();
  }, [getNewExercise]);

  let content = <></>;
  if (!currentExercise || !sessionId) {
    content = <Loading />;
  } else if (isICloze(currentExercise)) {
    content = (
      <ClozeWidget exercise={currentExercise} check={(e) => checkExercise(e, sessionId)} finish={getNewExercise} />
    );
  } else if (isIChoice(currentExercise)) {
    content = (
      <ChoiceWidget exercise={currentExercise} check={(e) => checkExercise(e, sessionId)} finish={getNewExercise} />
    );
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '30px',
          fontFamily: 'fantasy',
          fontSize: '2.5em',
          color: 'red',
        }}
      >
        <i>Dein derzeitiger Score: {score}</i>
      </div>
      {content}
    </>
  );
}
