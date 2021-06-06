import { Button } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { ICloze } from '../../../../common/src/entities/ICloze';
import { DropdownBlank } from './DropdownBlank';
import { InputBlank } from './InputBlank';
import './ClozeWidget.css';

function BottomButton(props: { label: string; onClick: () => void }) {
  return (
    <div className={'ContinueButton'}>
      <Button color={'primary'} variant="contained" classes={{ label: 'ContinueButtonText' }} onClick={props.onClick}>
        {props.label}
      </Button>
    </div>
  );
}

export function ClozeWidget(props: ClozeWidgetProps) {
  const { check, finish, exercise } = props;

  const [correctAnswers, setCorrectAnswers] = useState<string[] | undefined>(undefined);

  const useDropdown = exercise.possibleAnswers.length > 0;

  const edit = useCallback(
    (input: string, index: number) => {
      exercise.correctAnswers[index] = input;
    },
    [exercise.correctAnswers]
  );

  const content = !correctAnswers ? (
    <>
      <div>
        {exercise.correctAnswers.map((text, index) => {
          if (text) {
            return text;
          } else {
            return useDropdown ? (
              <DropdownBlank
                key={index}
                fillBlank={(input: string) => edit(input, index)}
                options={exercise.possibleAnswers}
              />
            ) : (
              <InputBlank key={index} fillBlank={(input: string) => edit(input, index)} />
            );
          }
        })}
      </div>
      <BottomButton
        label={'Überprüfen'}
        onClick={() => {
          check(exercise)
            .then(setCorrectAnswers)
            .catch((e) => {
              setCorrectAnswers([]);
              console.log(e);
            });
        }}
      />
    </>
  ) : (
    <>
      <div>
        {correctAnswers.map((text, index) => {
          const givenAnswer = exercise.correctAnswers[index];

          if (givenAnswer && givenAnswer.toLowerCase() !== text.toLowerCase()) {
            return (
              <span key={index} className={'IncorrectInput'}>
                {text}
              </span>
            );
          } else {
            return (
              <span key={index} className={'CorrectInput'}>
                {text}
              </span>
            );
          }
        })}
      </div>
      <BottomButton label={'Nächste Aufgabe'} onClick={() => finish()} />
    </>
  );
  return <div className={'ClozeRoot'}>{content}</div>;
}

export type ClozeWidgetProps = {
  exercise: ICloze;
  check: (exercise: ICloze) => Promise<string[]>;
  finish: () => void;
};
