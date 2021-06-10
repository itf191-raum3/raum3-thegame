import { checkExercise, fetchCurrentStats, fetchExercise, SessionStats } from 'api/APIUtils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ChoiceWidget } from 'widgets/choice/ChoiceWidget';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { Loading } from 'widgets/common/Loading';
import { SessionContext } from 'widgets/sessionContext/SessionContext';
import { IExercise } from '../../../../common/src/entities/IExercise';
import { isIChoice, isICloze } from './ExerciseTypeGuards';

export function ExerciseContainer() {
  const [currentExercise, setCurrentExercise] = useState<IExercise | undefined>(undefined);
  const [stats, setStats] = useState<SessionStats | undefined>(undefined);

  const sessionManager = useContext(SessionContext);
  const sessionId = sessionManager?.sessionId;

  const getNewExercise = useCallback(() => {
    setCurrentExercise(undefined);

    if (sessionId) {
      fetchExercise(sessionId).then(setCurrentExercise).catch(console.log);
      fetchCurrentStats(sessionId).then(setStats).catch(console.log);
    }
  }, [sessionId]);

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

  let statContent = stats ? (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        fontFamily: 'fantasy',
        fontSize: '2.5em',
        color: 'red',
      }}
    >
      <i>Dein derzeitiger Score: {stats?.score}</i>
      <br></br>
      <i>Die derzeitige Schwierigkeit: {stats?.maxDifficulty}</i>
    </div>
  ) : (
    <></>
  );

  return (
    <>
      {statContent}
      {content}
    </>
  );
}
