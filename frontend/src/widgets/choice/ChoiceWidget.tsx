import classes from '*.module.css';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { IChoice } from '../../../../common/src/entities/IChoice';
import './ChoiceExercise.css';

export function ChoiceWidget(isMultipleChoice : boolean)
{
    return (
        <div>
            <FormControl variant="outlined" className={classes.FormControl}>
                <InputLabel>Antwort</InputLabel>
                <Select>

                </Select>
                <menuitem></menuitem>
            </FormControl>
        </div>
    );
}

export type ClozeWidgetProps = {
    exercise: IChoice;
    check: (exercise: IChoice) => Promise<IChoice>;
    finish: () => void;
  };