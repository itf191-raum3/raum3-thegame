import { Button, Slide } from '@material-ui/core';
import { AppStateEnum } from 'App';
import './WelcomePage.css';

export function WelcomePage(props: WelcomePageProps) {
  const { changeAppState } = props;
  const slideInTimer = 500;

  return (
    <div>
      <div>
        <Slide in={true} direction="down" timeout={slideInTimer} unmountOnExit mountOnEnter>
          <div className="WelcomePageTitle">
            Willkommen im Spiel
            <br />
            RAUM 3 THE GAME
          </div>
        </Slide>
        <div className="WelcomePageButton">
          <Slide in={true} direction="right" timeout={slideInTimer} unmountOnExit mountOnEnter>
            <Button
              classes={{ label: 'WelcomePageButtonText' }}
              color={'primary'}
              variant="contained"
              onClick={() => changeAppState(AppStateEnum.EXERCISES)}
            >
              Ich will etwas lernen!
            </Button>
          </Slide>
        </div>
        <div className="WelcomePageButton">
          <Slide in={true} direction="left" timeout={slideInTimer} unmountOnExit mountOnEnter>
            <Button
              classes={{ label: 'WelcomePageButtonText' }}
              color={'primary'}
              variant="contained"
              onClick={() => changeAppState(AppStateEnum.EDITOR)}
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
