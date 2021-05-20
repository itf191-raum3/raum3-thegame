import { useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import './App.css';
import {ChoiceWidget} from 'widgets/choice/ChoiceWidget';
import { IChoice } from '../../common/src/entities/IChoice';
import { ISubject } from '../../common/src/entities/ISubject';

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}


var demo: IChoice = 
{
  id: '0',
  difficulty: 3,
  possibleAnswers: [],
  options: [],
  isDropDown: true,
  label: '',
  correctAnswers: ['Beispiel für eine ', '', 'Choice aufgabe!'],
}

const correctDemo: IChoice = {
  id: '0',
  difficulty: 3,
  possibleAnswers: [],
  options: [],
  isDropDown: true,
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
  ]
};

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  let content = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = <>EDITOR: TO BE IMPLEMENTED</>;
  } else if (appState === AppStateEnum.EXERCISES) {
    content = (
      <ChoiceWidget
        exercise={demo}
        finish={() => setAppState(AppStateEnum.WELCOMEPAGE)}
        check={async (e) => correctDemo}
      />
    );
  }

  return <div className="App">{content}</div>;
}

export default App;
