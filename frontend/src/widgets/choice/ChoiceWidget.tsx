import { IChoice } from '../../../../common/src/entities/IChoice';
import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

function SubmitButton(props: { label: string; onclick: () => void }) {
  return (
    <div className={'ContinueButton'}>
      <Button variant="contained" color="primary" classes={{ label: 'ContinueButtonText' }} onClick={props.onclick}>
        {props.label}
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export function ChoiceWidget(props: ChoiceWidgetProps) {
  const { check, exercise } = props;
  const [correctAnswers, setCorrectAnswers] = useState<string[] | undefined>(undefined);
  const classes = useStyles();
  const state = React.useState('');
  var content = !correctAnswers ? (
    <div>
      {props.exercise.correctAnswers.map((data) => {
        if (data === ' ') {
          return (
            <FormControl className={classes.formControl}>
              <InputLabel id="choiceBoxLabel">Auswahl</InputLabel>
              <Select labelId="choiceBoxLabel" value={state}>
                {props.exercise.possibleAnswers.map((dataset, index) => {
                  return (
                    <MenuItem key={index} value={dataset}>
                      {dataset}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        } else {
          return <p>{data}</p>;
        }
      })}
      <div>
        <Button variant="contained" color="primary">
          Überprüfen
        </Button>
      </div>
    </div>
  ) : (
    <div>
      {props.exercise.correctAnswers.map((data) => {
        if (data === ' ') {
          return (
            <FormControl className={classes.formControl}>
              <InputLabel id="choiceBoxLabel">Auswahl</InputLabel>
              <Select labelId="choiceBoxLabel">
                console.log(data);
                {props.exercise.correctAnswers.map((dataset, index) => {
                  if (dataset !== '') {
                    return (
                      <MenuItem key={index} value={dataset}>
                        {dataset}
                      </MenuItem>
                    );
                  } else {
                    return '';
                  }
                })}
              </Select>
            </FormControl>
          );
        } else {
          return <p>{data}</p>;
        }
      })}
      <div>
        <SubmitButton
          label={'Überprüfen'}
          onclick={() => {
            check(exercise)
              .then(setCorrectAnswers)
              .catch((e) => {
                setCorrectAnswers([]);
                console.log(e);
              });
          }}
        />
      </div>
    </div>
  );
  return <div className={'ChoiceRoot'}>{content}</div>;
}

export type ChoiceWidgetProps = {
  exercise: IChoice;
  check: (exercise: IChoice) => Promise<string[]>;
  finish: () => void;
};
