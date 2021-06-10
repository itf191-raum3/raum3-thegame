import { TextField, withStyles } from '@material-ui/core';
import { useState } from 'react';
import './ClozeWidget.css';

const WhiteTextField = withStyles({
  root: {
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },
})(TextField);

export function InputBlank(props: BlankProps) {
  const { fillBlank } = props;

  const [input, setInput] = useState<string>('');

  return (
    <WhiteTextField
      style={{ margin: '0px 10px' }}
      classes={{ root: 'InputBlank' }}
      variant="standard"
      value={input}
      onChange={(e) => {
        const newString = e.target.value;
        setInput(newString);
        fillBlank(newString);
      }}
    />
  );
}

export type BlankProps = {
  fillBlank: (input: string) => void;
};
