import { Button, Slide } from '@material-ui/core';
import { AppStateEnum } from 'App';
import { useState } from 'react';
import './WelcomePage.css';

export function WelcomePage(props: WelcomePageProps) {
  const { changeAppState } = props;
  const slideInTimer = 700;

  const [visible, setVisible] = useState<boolean>(true);

  const switchState = (state: AppStateEnum) => {
    setVisible(false);
    setTimeout(() => changeAppState(state), slideInTimer);
  };

  return (
    <div>
      <div>
        <Slide in={visible} direction="down" timeout={slideInTimer} unmountOnExit mountOnEnter>
          <div className="WelcomePageTitle">
            Willkommen im Spiel
            <br />
            RAUM 3 THE GAME
          </div>
        </Slide>
        <div className="WelcomePageButton">
          <Slide in={visible} direction="right" timeout={slideInTimer} unmountOnExit mountOnEnter>
            <Button
              classes={{ label: 'WelcomePageButtonText' }}
              color={'primary'}
              variant="contained"
              onClick={() => switchState(AppStateEnum.EXERCISES)}
            >
              Ich will etwas lernen!
            </Button>
          </Slide>
        </div>
        <div className="WelcomePageButton">
          <Slide in={visible} direction="left" timeout={slideInTimer} unmountOnExit mountOnEnter>
            <Button
              classes={{ label: 'WelcomePageButtonText' }}
              color={'primary'}
              variant="contained"
              onClick={() => switchState(AppStateEnum.EDITOR)}
            >
              Ich will neue Fragen erstellen!
            </Button>
          </Slide>
        </div>
      </div>
    </div>
  );
}

type WelcomePageProps = {
  changeAppState: (newAppState: AppStateEnum) => void;
};
