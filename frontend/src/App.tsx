import { useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import './App.css';
import {IChoice} from "../../common/src/entities/IChoice";
import {ChoiceWidget} from "widgets/choice/ChoiceWidget";
import { ISubject } from '../../common/src/entities/ISubject';

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
    label: 'Test Subject',
  };

  const demo: IChoice = {
    id: '0',
    possibleAnswers: ["test", "test2", "test3"],
    label: '',
    correctAnswers: [
      'Bespiel für ein Dropdown menu ',
      ' ',
    ],
    difficulty: 1,
    isMultipleChoice: true,
    subject: demoSubject
  };

  const correctDemo: IChoice = {
    id: '0',
    possibleAnswers: [],
    label: '',
    correctAnswers: [
      'Lösung Dropdownmenu  ',
      ' ',
    ],
    difficulty: 1,
    isMultipleChoice: true,
    subject: demoSubject
  };

  let content = <></>;
  if (appState === AppStateEnum.WELCOMEPAGE) {
    content = <WelcomePage changeAppState={setAppState} />;
  } else if (appState === AppStateEnum.EDITOR) {
    content = <>EDITOR: TO BE IMPLEMENTED</>;
  } else if (appState === AppStateEnum.EXERCISES) {
    // content = <>EXERCISES: TO BE IMPLEMENTED</>;
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
