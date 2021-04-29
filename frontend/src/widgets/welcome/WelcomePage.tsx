import { Button, Fade } from '@material-ui/core';
import { AppStateEnum } from 'App';
import './WelcomePage.css';

export function WelcomePage(props: WelcomePageProps) {
  const { changeAppState } = props;
  const fadeInTimer = 1000;

  document.title = 'Welcome';

  return (
    <div>
      <Fade in={true} timeout={fadeInTimer * 2}>
        <>
          <div className="WelcomePageTitle">
            Willkommen im Spiel
            <br />
            RAUM 3 THE GAME
          </div>
          <div className="WelcomePageButton">
            <Fade in={true} timeout={fadeInTimer * 4}>
              <Button
                classes={{ label: 'WelcomePageButtonText' }}
                color={'primary'}
                variant="contained"
                onClick={() => changeAppState(AppStateEnum.EXERCISES)}
              >
                Ich will etwas lernen!
              </Button>
            </Fade>
          </div>
          <div className="WelcomePageButton">
            <Fade in={true} timeout={fadeInTimer * 6}>
              <Button
                classes={{ label: 'WelcomePageButtonText' }}
                color={'primary'}
                variant="contained"
                onClick={() => changeAppState(AppStateEnum.EDITOR)}
              >
                Ich will neue Fragen erstellen!
              </Button>
            </Fade>
          </div>
        </>
      </Fade>
    </div>
  );
}

type WelcomePageProps = {
  changeAppState: (newAppState: AppStateEnum) => void;
};
