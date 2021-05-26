import { useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import { Configuration } from 'widgets/configuration/Configuration';
import './App.css';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  let content = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = <Configuration/>;
  } else if (appState === AppStateEnum.EXERCISES) {
    content = <>EXERCISES: TO BE IMPLEMENTED</>;
  }

  return <div className="App">{content}</div>;
}

export default App;
