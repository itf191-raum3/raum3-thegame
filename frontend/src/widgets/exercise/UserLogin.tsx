import { Button, makeStyles, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { SessionContext, SessionManager } from 'widgets/sessionContext/SessionContext';

const subjectId = 'AE';

const useStyles = makeStyles({
  root: {
    color: 'white',
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12.5px 10px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(128,128,128)',
    },
  },
});

export function UserLogin(props: UserLoginProps) {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [sessionManager, setSessionManager] = useState<SessionManager | undefined>(undefined);

  const storedUsername = useMemo(() => localStorage.getItem(SessionManager.USERNAME_STORAGE_ID), []);
  const storedSessionId = useMemo(
    () => localStorage.getItem(SessionManager.GAMESESSION_STORAGE_ID + subjectId) || undefined,
    []
  );

  const classes = useStyles();

  useEffect(() => {
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, [storedUsername]);

  const onClick = () => {
    if (userName) {
      const sessionManager = new SessionManager(userName, storedSessionId);
      if (storedUsername !== userName) {
        sessionManager
          .initializeGameSession(subjectId)
          .then(() => {
            setSessionManager(sessionManager);
          })
          .catch(console.log);
      } else {
        setSessionManager(sessionManager);
      }
    }
  };

  return sessionManager ? (
    <SessionContext.Provider value={sessionManager}>{props.children}</SessionContext.Provider>
  ) : (
    <div>
      <div>Bitte gib einen Benutzernamen ein:</div>
      <div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <TextField
            variant="outlined"
            color="primary"
            className={classes.root}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!userName}
          />
        </div>
      </div>
      <div>
        <Tooltip title={userName ? '' : "Ohne Username geht's nicht weiter"}>
          <div>
            <Button color="primary" variant="contained" disabled={!userName} onClick={onClick}>
              Einloggen
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export type UserLoginProps = {
  children: React.ReactElement;
};
