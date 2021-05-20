import classes from '*.module.css';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import './ChoiceExercise.css';

export function ChoiceExercise(isMultipleChoice : boolean)
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