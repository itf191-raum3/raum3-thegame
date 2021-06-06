import { IChoice } from '../../../../common/src/entities/IChoice';
import { useCallback, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core';
import { CheckResponse } from 'api/APIUtils';
import { negativeFeedback, positiveFeedback } from 'widgets/common/Feedback';
import './ChoiceWidget.css';

function SubmitButton(props: { label: string; onclick: () => void }) {
  return (
    <div className={'ContinueButton'}>
      <Button variant="contained" color="primary" classes={{ label: 'ContinueButtonText' }} onClick={props.onclick}>
        {props.label}
      </Button>
    </div>
  );
}

export function ChoiceWidget(props: ChoiceWidgetProps) {
  const { check, exercise, finish } = props;
  const [correctAnswers, setCorrectAnswers] = useState<CheckResponse | undefined>(undefined);
  const [answers, setAnswers] = useState<boolean[]>(exercise.possibleAnswers.map((p) => false));

  const onChange = useCallback(
    (newAnswers) => {
      exercise.correctAnswers = exercise.possibleAnswers.flatMap((a, index2) => {
        if (newAnswers[index2]) {
          return [a];
        } else {
          return [];
        }
      });
      setAnswers([...newAnswers]);
    },
    [exercise]
  );

  const content = !correctAnswers ? (
    <div>
      <div style={{ marginBottom: '30px', fontSize: '2em' }}>{exercise.label}</div>
      <FormGroup>
        {exercise.possibleAnswers.map((answer, index) => {
          console.log(answers);
          return (
            <FormControlLabel
              key={answer}
              control={
                exercise.isMultipleChoice ? (
                  <Checkbox
                    checked={answers[index]}
                    onChange={() => {
                      answers[index] = !answers[index];
                      onChange(answers);
                    }}
                  />
                ) : (
                  <Radio
                    checked={answers[index]}
                    value={answer}
                    onChange={() => {
                      const newAnswers = exercise.possibleAnswers.map((p) => false);
                      newAnswers[index] = !answers[index];
                      onChange(newAnswers);
                    }}
                  />
                )
              }
              label={answer}
            />
          );
        })}
      </FormGroup>
      <SubmitButton
        label={'Überprüfen'}
        onclick={() => {
          check(exercise)
            .then(setCorrectAnswers)
            .catch((e) => {
              setCorrectAnswers({ answers: ['Error'], isCorrect: [false] });
              console.log(e);
            });
        }}
      />
    </div>
  ) : (
    <div>
      <div style={{ marginBottom: '50px', fontSize: '2em' }}>
        {correctAnswers.isCorrect.every((c) => c)
          ? positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)]
          : negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)]}
      </div>
      <div style={{ marginBottom: '30px', fontSize: '2em' }}>{exercise.label}</div>
      <FormGroup>
        {correctAnswers.answers.map((answer, index) => {
          return (
            <FormControlLabel
              style={{ color: 'white' }}
              key={answer}
              control={
                exercise.isMultipleChoice ? (
                  <Checkbox
                    classes={{ disabled: 'DisabledText' }}
                    checked={correctAnswers.isCorrect[index]}
                    disabled={true}
                  />
                ) : (
                  <Radio
                    classes={{ disabled: 'DisabledText' }}
                    checked={correctAnswers.isCorrect[index]}
                    disabled={true}
                  />
                )
              }
              disabled={false}
              label={answer}
            />
          );
        })}
      </FormGroup>
      <div>
        <SubmitButton
          label={'Nächste Aufgabe'}
          onclick={() => {
            finish();
          }}
        />
      </div>
    </div>
  );
  return <div className={'ChoiceRoot'}>{content}</div>;
}

export type ChoiceWidgetProps = {
  exercise: IChoice;
  check: (exercise: IChoice) => Promise<CheckResponse>;
  finish: () => void;
};
