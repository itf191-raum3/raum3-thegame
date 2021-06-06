import { useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import { Configuration } from 'widgets/configuration/Configuration';
import './App.css';
import { ExerciseContainer } from 'widgets/exercise/ExerciseContainer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { PasswordWrapper } from 'widgets/common/PasswordWrapper';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  // define page content
  let content = <></>;
  let returnButton = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = (
      <PasswordWrapper>
        <Configuration />
      </PasswordWrapper>
    );
  } else if (appState === AppStateEnum.EXERCISES) {
    content = <ExerciseContainer />;
  }

  if (appState !== AppStateEnum.WELCOMEPAGE) {
    returnButton = (
      <IconButton
        color="primary"
        style={{
          position: 'absolute',
          left: '40px',
          top: '40px',
          height: '57px',
          width: '57px',
          border: '5px solid',
        }}
        onClick={() => setAppState(AppStateEnum.WELCOMEPAGE)}
      >
        <ArrowBackIcon color="primary" style={{ height: '90%', width: '90%' }} />
      </IconButton>
    );
  }

  return (
    <div className="App">
      {returnButton}
      {content}
    </div>
  );
}

export default App;
