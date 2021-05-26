import {IChoice} from "../../../../common/src/entities/IChoice";
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    var content = <div>
        {props.exercise.correctAnswers.map(data => {
            if(data == ' ')
            {
                <FormControl className={'ChoiceRoot'}>
            <InputLabel id="choiceBoxLabel">Auswahl</InputLabel>
            <Select defaultValue="Auswahl" labelId="choiceBoxLabel">
                {props.exercise.options.map(dataset =>  <MenuItem key={dataset} value={dataset}>{dataset}</MenuItem>)}
            </Select>
            </FormControl>}
            else
            {
              <p>{data}</p>
            }})}
    </div>;
    console.log(content);
    return <div className={'ChoiceRoot'}>{content}</div>
}

export type ChoiceWidgetProps =
    {
        exercise: IChoice,
        check: (exercise: IChoice) => Promise<IChoice>;
        finish: () => void;
    }