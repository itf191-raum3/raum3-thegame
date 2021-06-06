import { useEffect, useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import './App.css';
import { ExerciseContainer } from 'widgets/exercise/ExerciseContainer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { Loading } from 'widgets/common/Loading';
import { initializeGameSession } from 'api/APIUtils';
import { GameSessionId, SessionContext, SessionManager } from 'widgets/sessionContext/SessionContext';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
  INITILIAZING,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.INITILIAZING);
  const [sessionManager, setSessionManager] = useState<SessionManager | undefined>(undefined);

  // initialize game session
  useEffect(() => {
    const init = async () => {
      let sessionId = localStorage.getItem(GameSessionId);

      if (!sessionId) {
        sessionId = await initializeGameSession();
      }

      const sessionManager = new SessionManager(sessionId);
      setSessionManager(sessionManager);
    };

    init()
      .catch((e) => console.log(e))
      .finally(() => setAppState(AppStateEnum.WELCOMEPAGE));
  }, [appState]);

  // define page content
  let content = <></>;
  let returnButton = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = <>EDITOR: TO BE IMPLEMENTED</>;
  } else if (appState === AppStateEnum.EXERCISES) {
    content = <ExerciseContainer />;
  } else if (appState === AppStateEnum.INITILIAZING) {
    content = <Loading />;
  }

  if (appState === AppStateEnum.EXERCISES || appState === AppStateEnum.EDITOR) {
    returnButton = (
      <IconButton
        color="primary"
        style={{
          position: 'absolute',
          left: '40px',
          top: '40px',
          height: '100px',
          width: '100px',
          border: '5px solid',
        }}
        onClick={() => setAppState(AppStateEnum.WELCOMEPAGE)}
      >
        <ArrowBackIcon color="primary" style={{ height: '90%', width: '90%' }} />
      </IconButton>
    );
  }

  return (
    <SessionContext.Provider value={sessionManager}>
      <div className="App">
        {returnButton}
        {content}
      </div>
    </SessionContext.Provider>
  );
}

export default App;
