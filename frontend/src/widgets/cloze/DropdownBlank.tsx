import { makeStyles, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';
import { BlankProps } from './InputBlank';
import './ClozeWidget.css';

const useStyles = makeStyles({
  white: {
    color: 'white',
  },
});

export function DropdownBlank(props: DropdownBlankProps) {
  const { fillBlank, options } = props;

  const classes = useStyles();

  const [input, setInput] = useState<string>('');

  return (
    <Select
      style={{ margin: '0px 10px', minWidth: '120px', borderBottomColor: 'white' }}
      variant="standard"
      value={input}
      classes={{ icon: classes.white, root: classes.white }}
      onChange={(e) => {
        const newString = e.target.value as string;
        setInput(newString);
        fillBlank(newString);
      }}
    >
      {options.map((o) => {
        return (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export type DropdownBlankProps = BlankProps & {
  options: string[];
};
