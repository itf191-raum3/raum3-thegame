import { Button, makeStyles, TextField } from '@material-ui/core';
import { checkPassword } from 'api/APIUtils';
import React, { useState } from 'react';

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

export function PasswordWrapper(props: PasswordWrapperProps) {
  const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);
  const [input, setInput] = useState<string>('');

  const classes = useStyles();

  return hasAccess ? (
    props.children
  ) : (
    <div>
      Password:
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          color="primary"
          className={classes.root}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={hasAccess === false}
        />
      </div>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            checkPassword(input).then((success) => setHasAccess(success));
          }}
        >
          Überprüfen
        </Button>
      </div>
    </div>
  );
}

export type PasswordWrapperProps = {
  children: React.ReactElement;
};
