import {Button, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {AppStateEnum} from 'App';
import React, {useEffect, useState} from 'react';
import './WelcomePage.css';
import {GameSessionStatsResponse, getGameSessions} from "../../api/APIUtils";

const slideInTimer = 700;

function WelcomePageButton(props: WelcomePageButtonProps) {
    const {dir, label, switchState, visible} = props;

    return (
        <div className="WelcomePageButton">
            <Slide in={visible} direction={dir} timeout={slideInTimer} unmountOnExit mountOnEnter>
                <Button
                    classes={{label: 'WelcomePageButtonText'}}
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
    const {changeAppState} = props;

    const [visible, setVisible] = useState<boolean>(true);
    const [gameSessions, setGameSessions] = useState<Array<GameSessionStatsResponse>>([]);
    const loadGameSessions = () => {
        (async () => {
            setGameSessions(await getGameSessions());
        })();
    }

    useEffect(() => {
        loadGameSessions()
    }, []) // don't forget this empty bracket it indicates the function will only run once when the component will load initially

    const switchState = (state: AppStateEnum) => {
        setVisible(false);
        setTimeout(() => changeAppState(state), slideInTimer);
    };

    return (
        <div>
            <Slide in={visible} direction="down" timeout={slideInTimer} unmountOnExit mountOnEnter>
                <div className="WelcomePageTitle">
                    Willkommen im Spiel
                    <br/>
                    RAUM 3 THE GAME
                </div>
            </Slide>
            <WelcomePageButton
                dir="right"
                label="Ich will etwas lAErnen!"
                switchState={() => switchState(AppStateEnum.EXERCISES)}
                visible={visible}
            />
            <WelcomePageButton
                dir="left"
                label="Ich will neue Fragen erstellen!"
                switchState={() => switchState(AppStateEnum.EDITOR)}
                visible={visible}
            />
            <br/>
            <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Punktzahl</TableCell>
                            <TableCell>Beantwortet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameSessions.sort((a, b) => a.score < b.score ? 1 : -1).map((row, i) => (
                            <TableRow key={row.username}>
                                <TableCell>#{i + 1}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>{row.answeredAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

type WelcomePageProps = {
    changeAppState: (newAppState: AppStateEnum) => void;
};
