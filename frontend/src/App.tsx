import { useState } from 'react';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import { ICloze } from '../../common/src/entities/ICloze';
import './App.css';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  const demo: ICloze = {
    id: 0,
    options: [],
    label: '',
    correctAnswers: [
      'Hier sehen wir einen ',
      '',
      ' der mit ',
      '',
      ' gefüllt werden sollte.',
      'Die Aufgabe kann auch ',
      '',
      ' werden.',
    ],
    isMultipleChoice: false,
  };

  const correctDemo: ICloze = {
    id: 0,
    options: [],
    label: '',
    correctAnswers: [
      'Hier sehen wir einen ',
      'Lückentext',
      ' der mit ',
      'Wörtern',
      ' gefüllt werden sollte.',
      'Die Aufgabe kann auch ',
      'überprüft',
      ' werden.',
    ],
    isMultipleChoice: false,
  };

  let content = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = <>EDITOR: TO BE IMPLEMENTED</>;
  } else if (appState === AppStateEnum.EXERCISES) {
    // content = <>EXERCISES: TO BE IMPLEMENTED</>;
    content = (
      <ClozeWidget
        exercise={demo}
        finish={() => setAppState(AppStateEnum.WELCOMEPAGE)}
        check={async (e) => correctDemo}
      />
    );
  }

  return <div className="App">{content}</div>;
}

export default App;
