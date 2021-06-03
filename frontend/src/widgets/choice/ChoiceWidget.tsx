import {IChoice} from "../../../../common/src/entities/IChoice";
import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export function ChoiceWidget(props: ChoiceWidgetProps)
{
    const { check, finish, exercise } = props;
    const [correctAnswers, setCorrectAnswers] = useState<string[] | undefined>(undefined);
    const classes = useStyles();

    var content = !correctAnswers ? ( <div>
        {props.exercise.correctAnswers.map(data => {
            if(data == ' ')
            {
              return (
                <FormControl className={classes.formControl}>
            <InputLabel id="choiceBoxLabel">Auswahl</InputLabel>
            <Select labelId="choiceBoxLabel">
                {props.exercise.possibleAnswers.map((dataset, index) => 
                {
                  return <MenuItem key={index} value={dataset}>{dataset}</MenuItem>
                })}
            </Select>
            </FormControl>)}
            else
            {
              return <p>{data}</p>
            }})}
            <div>
            <Button variant="contained" color="primary" >
              Überprüfen
            </Button>
            </div>
    </div>) : 
    (
      <div>
        {props.exercise.correctAnswers.map(data => {
            if(data == ' ')
            {
              return (
                <FormControl className={classes.formControl}>
            <InputLabel id="choiceBoxLabel">Auswahl</InputLabel>
            <Select labelId="choiceBoxLabel">
                {props.exercise.possibleAnswers.map((dataset, index) => 
                {
                  return <MenuItem key={index} value={dataset}>{dataset}</MenuItem>
                })}
            </Select>
            </FormControl>)}
            else
            {
              return <p>{data}</p>
            }})}
            <div>
            <Button variant="contained" color="primary" 
            onClick={() => {
              label: {'Überprüfen'}
              check(exercise)
              .then(setCorrectAnswers)
              .catch((e) => {
              setCorrectAnswers([]);
              console.log(e);
            });}}/>
            </div>
      </div>
    );
    return <div className={'ChoiceRoot'}>{content}</div>
}

export type ChoiceWidgetProps =
    {
        exercise: IChoice,
        check: (exercise: IChoice) => Promise<IChoice>;
        finish: () => void;
    }