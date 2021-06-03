import { useState } from 'react';
import { ClozeWidget } from 'widgets/cloze/ClozeWidget';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import { ICloze } from '../../common/src/entities/ICloze';
import { ISubject } from '../../common/src/entities/ISubject';
import './App.css';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  const demoSubject: ISubject = {
    IExercises: [],
    id: '0',
    label: 'dldldl',
  };
  const demo: ICloze = {
    id: '0',
    possibleAnswers: ['Lückentext', 'Wörtern', 'überprüft'],
    label: '',
    correctAnswers: [
      'Hier sehen wir einen ',
      '',
      ' der mit ',
      '',
      ' gefüllt werden sollte. Die Aufgabe kann auch ',
      '',
      ' werden.',
    ],
    isDropDown: false,
    difficulty: 1,
    subject: demoSubject,
  };

  const correctDemo: ICloze = {
    id: '0',
    possibleAnswers: [],
    label: '',
    correctAnswers: [
      'Hier sehen wir einen ',
      'Lückentext',
      ' der mit ',
      'Wörtern',
      ' gefüllt werden sollte. Die Aufgabe kann auch ',
      'überprüft',
      ' werden.',
    ],
    isDropDown: false,
    difficulty: 1,
    subject: demoSubject,
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
        check={async (e) => correctDemo.correctAnswers}
      />
    );
  }

  return <div className="App">{content}</div>;
}

export default App;
