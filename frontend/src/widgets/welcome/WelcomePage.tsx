import { Button, Slide } from '@material-ui/core';
import { AppStateEnum } from 'App';
import { useState } from 'react';
import './WelcomePage.css';

const slideInTimer = 700;

function WelcomePageButton(props: WelcomePageButtonProps) {
  const { dir, label, switchState, visible } = props;

  return (
    <div className="WelcomePageButton">
      <Slide in={visible} direction={dir} timeout={slideInTimer} unmountOnExit mountOnEnter>
        <Button
          classes={{ label: 'WelcomePageButtonText' }}
          color={'primary'}
          variant="contained"
          onClick={switchState}
        >
          {label}
        </Button>
      </Slide>
    </div>
  );
}

type WelcomePageButtonProps = {
  visible: boolean;
  dir: 'left' | 'right';
  label: string;
  switchState: () => void;
};

export function WelcomePage(props: WelcomePageProps) {
  const { changeAppState } = props;

  const [visible, setVisible] = useState<boolean>(true);

  const switchState = (state: AppStateEnum) => {
    setVisible(false);
    setTimeout(() => changeAppState(state), slideInTimer);
  };

  return (
    <div>
      <Slide in={visible} direction="down" timeout={slideInTimer} unmountOnExit mountOnEnter>
        <div className="WelcomePageTitle">
          Willkommen im Spiel
          <br />
          RAUM 3 THE GAME
        </div>
      </Slide>
      <WelcomePageButton
        dir="right"
        label="Ich will etwas lernen!"
        switchState={() => switchState(AppStateEnum.EXERCISES)}
        visible={visible}
      />
      <WelcomePageButton
        dir="left"
        label="Ich will neue Fragen erstellen!"
        switchState={() => switchState(AppStateEnum.EDITOR)}
        visible={visible}
      />
    </div>
  );
}

type WelcomePageProps = {
  changeAppState: (newAppState: AppStateEnum) => void;
};
