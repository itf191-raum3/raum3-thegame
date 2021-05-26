import { useState } from 'react';
import { WelcomePage } from 'widgets/welcome/WelcomePage';
import './App.css';
import {IChoice} from "../../common/src/entities/IChoice";
import {ChoiceWidget} from "widgets/choice/ChoiceWidget";

export enum AppStateEnum {
  WELCOMEPAGE,
  EXERCISES,
  EDITOR,
}

function App() {
  const [appState, setAppState] = useState<AppStateEnum>(AppStateEnum.WELCOMEPAGE);

  const demo: IChoice = {
    id: 0,
    options: ["test", "test2", "test3"],
    label: '',
    correctAnswers: [
      'Bespiel für ein Dropdown menu ',
      ' ',
    ],
    isDropDown: true
  };

  const correctDemo: IChoice = {
    id: 0,
    options: [],
    label: '',
    correctAnswers: [
      'Lösung Dropdownmenu  ',
      ' ',
    ],
    isDropDown: true,
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
