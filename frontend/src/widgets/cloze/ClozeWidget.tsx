import { Button } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { ICloze } from '../../../../common/src/entities/ICloze';
import { DropdownBlank } from './DropdownBlank';
import { InputBlank } from './InputBlank';
import './ClozeWidget.css';

export function ClozeWidget(props: ClozeWidgetProps) {
  const { check, finish, exercise } = props;

  const [checkedExercise, setCheckedExercise] = useState<ICloze | undefined>(undefined);

  const useDropdown = exercise.options.length > 0;

  const edit = useCallback(
    (input: string, index: number) => {
      exercise.correctAnswers[index] = input;
    },
    [exercise.correctAnswers]
  );

  const content = !checkedExercise ? (
    <>
      <div>
        {exercise.correctAnswers.map((text, index) => {
          if (text) {
            return text;
          } else {
            return useDropdown ? (
              <DropdownBlank key={index} fillBlank={(input: string) => edit(input, index)} options={exercise.options} />
            ) : (
              <InputBlank key={index} fillBlank={(input: string) => edit(input, index)} />
            );
          }
        })}
      </div>
      <div className={'ContinueButton'}>
        <Button
          variant="outlined"
          classes={{ label: 'ContinueButtonText', root: 'ContinueButton' }}
          onClick={() => {
            check(exercise)
              .then(setCheckedExercise)
              .catch((e) => console.log(e));
          }}
        >
          {'Überprüfen'}
        </Button>
      </div>
    </>
  ) : (
    <>
      <div className={'ContinueButton'}>
        {checkedExercise.correctAnswers.map((text, index) => {
          if (text !== exercise.correctAnswers[index]) {
            return <span className={'IncorrectInput'}>{text}</span>;
          } else {
            return <span className={'CorrectInput'}>{text}</span>;
          }
        })}
      </div>
      <div>
        <Button
          variant="outlined"
          classes={{ label: 'ContinueButton' }}
          onClick={() => {
            finish();
          }}
        >
          {'Nächste Aufgabe'}
        </Button>
      </div>
    </>
  );
  return <div className={'ClozeRoot'}>{content}</div>;
}

export type ClozeWidgetProps = {
  exercise: ICloze;
  check: (exercise: ICloze) => Promise<ICloze>;
  finish: () => void;
};
