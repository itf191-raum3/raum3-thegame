import { Select } from '@material-ui/core';
import { useState } from 'react';
import { BlankProps } from './InputBlank';
import './ClozeWidget.css';

export function DropdownBlank(props: DropdownBlankProps) {
  const { fillBlank, options } = props;

  const [input, setInput] = useState<string>('');

  return (
    <Select
      style={{ margin: '0px 10px' }}
      variant="standard"
      value={input}
      onChange={(e) => {
        const newString = e.target.value as string;
        setInput(newString);
        fillBlank(newString);
      }}
    >
      {options}
    </Select>
  );
}

export type DropdownBlankProps = BlankProps & {
  options: string[];
};
