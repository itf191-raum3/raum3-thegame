import './Configuration.css';
import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png';
import addIcon from './add_icon.png';

import { IExercise } from '../../../../common/src/entities/IExercise';
import { useState } from 'react';
import { ISubject } from '../../../../common/src/entities/ISubject';
import { Tooltip } from '@material-ui/core';

export function Configuration() {
  var workingExercise = clearExercise();

  var subject = 'AE';
  const [allExercises, setAllExercises] = useState<IExercise[]>(Array<IExercise>());
  const [workingTable, setWorkingTable] = useState<JSX.Element>();

  return (
    <div className="Configuration">
      <div id="menu">
        <ul>
          <li>
            <button className="navBtn" onClick={() => loadSubject('AE')}>
              Anwendungsentwicklung
            </button>
          </li>
        </ul>
      </div>
      <div id="workingArea">
        {workingTable}
        <br />
        <br />
      </div>
      <div>{renderShowingTable()}</div>
    </div>
  );

  function loadCreateTable() {
    workingExercise = clearExercise();
    resetInputs();
    setType('IChoice');

    return (
      <table id="createTabel">
        <thead>
          <th>Schwierigkeit</th>
          <th>Aufgabentype</th>
          <th>Aufgabe</th>
          <th>Richtige Antworten</th>
          <th>Antwortmöglichkeiten</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr className="information">
            <td>
              <input
                type="number"
                min="0"
                id="difficulty"
                placeholder="Schwierigkeit"
                defaultValue={workingExercise.difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </td>
            <td>
              <select onChange={(e) => setType(e.target.value)}>
                <option value="IChoice">Auswahlaufgabe</option>
                <option value="ICloze">Lückentext</option>
              </select>
            </td>
            <td>
              <Tooltip title="Eingabefelder für den Lückentext werden mit _ gekennzeichnet">
                <input
                  type="text"
                  placeholder="Aufgabenstellung"
                  defaultValue={workingExercise.label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  placeholder="Richtige Antworten"
                  defaultValue={workingExercise.correctAnswers}
                  onChange={(e) => setCorrect(e.target.value)}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  placeholder="Antwortmöglichkeiten"
                  defaultValue={workingExercise.possibleAnswers}
                  onChange={(e) => setPossible(e.target.value)}
                />
              </Tooltip>
            </td>
            <td>
              <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => cancelEditing()} />
            </td>
            <td>
              <img src={addIcon} alt="Bearbeiten" className="bntLogo" onClick={() => addDataSet()} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function loadEditTable(idStr: string) {
    workingExercise = clearExercise();
    const exercise = getExerciseInList(idStr);
    const { difficulty, label, correctAnswers, possibleAnswers } = exercise;

    workingExercise.id = idStr;
    setDifficulty(difficulty + '');
    setLabel(label);
    setCorrect(correctAnswers.join('; '));
    setPossible(possibleAnswers.join('; '));

    resetInputs();

    var exerciseType = 'Unbekannt';
    if ('isDropdown' in exercise) {
      exerciseType = 'Lückentext';
      setType('ICloze');
    } else if ('isMultipleChoice' in exercise) {
      exerciseType = 'Auswahlaufgabe';
      setType('IChoice');
    }

    var editTabel = (
      <table id="editTabel">
        <thead>
          <th>Schwierigkeit</th>
          <th>Aufgabentype</th>
          <th>Aufgabe</th>
          <th>Richtige Antworten</th>
          <th>Antwortmöglichkeiten</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr className="information">
            <td>
              <input
                type="number"
                min="0"
                id="difficulty"
                placeholder="Schwierigkeit"
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </td>
            <td id="exersiceType">{exerciseType}</td>
            <td>
              <input type="text" id="label" placeholder="Aufgabenstellung" onChange={(e) => setLabel(e.target.value)} />
            </td>
            <td>
              <input
                type="text"
                id="correctAnswers"
                placeholder="Richtige Antworten"
                onChange={(e) => setCorrect(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                id="allChoices"
                placeholder="Antwortmöglichkeiten"
                onChange={(e) => setPossible(e.target.value)}
              />
            </td>
            <td>
              <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => cancelEditing()} />
            </td>
            <td>
              <img src={acceptIcon} alt="Übernehmen" className="bntLogo" onClick={() => changeData()} />
            </td>
          </tr>
        </tbody>
      </table>
    );

    setWorkingTable(editTabel);
  }

  function resetInputs() {
    var allChoices = document.getElementById('allChoices') as HTMLInputElement;
    if (allChoices !== null) allChoices.defaultValue = workingExercise.possibleAnswers;

    var correct = document.getElementById('correctAnswers') as HTMLInputElement;
    if (correct !== null) correct.defaultValue = workingExercise.correctAnswers;

    var label = document.getElementById('label') as HTMLInputElement;
    if (label !== null) label.defaultValue = workingExercise.label;

    var difficulty = document.getElementById('difficulty') as HTMLInputElement;
    if (difficulty !== null) difficulty.defaultValue = workingExercise.difficulty;
  }

  function renderShowingTable() {
    return (
      <table id="showingTable">
        <thead>
          <th>Schwierigkeit</th>
          <th>Aufgabentype</th>
          <th>Aufgabe</th>
          <th>Richtige Antworten</th>
          <th>Antwortmöglichkeiten</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>{generateBody()}</tbody>
      </table>
    );
  }

  function generateBody() {
    var dataRows: JSX.Element[] = [];

    allExercises.forEach((exercise) => {
      const { id, difficulty, label, correctAnswers, possibleAnswers } = exercise;
      var exerciseType = 'Unbekannt';
      if ('isDropdown' in exercise) exerciseType = 'Lückentext';
      else if ('isMultipleChoice' in exercise) exerciseType = 'Auswahlaufgabe';

      dataRows.push(
        <tr id={id}>
          <td>{difficulty}</td>
          <td>{exerciseType}</td>
          <td>{label}</td>
          <td>{correctAnswers.join(' | ')}</td>
          <td>{possibleAnswers.join(' | ')}</td>
          <td>
            <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => deleteDataSet(id)} />
          </td>
          <td>
            <img src={editIcon} alt="Bearbeiten" className="bntLogo" onClick={() => editDataSet(id)} />
          </td>
        </tr>
      );
    });

    return dataRows;
  }

  function loadSubject(subjectID: string) {
    subject = subjectID;

    fetchGetSubject(subject)
      .then((subjectObj) => {
        setAllExercises(subjectObj.exercises);
      })
      .catch((_errorMsg) => {
        console.error(_errorMsg);
      });

    setWorkingTable(loadCreateTable());
  }

  function addDataSet() {
    const { label, difficulty, correctAnswers, possibleAnswers, exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      var correctAnswersList = correctAnswers.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = possibleAnswers.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      correctAnswersList.forEach((correctAnswer) => {
        if (arrayContains(possibleAnswersList, correctAnswers) === false) {
          possibleAnswersList.push(correctAnswer);
        }
      });

      var newExercise = {
        label: label,
        difficulty: difficulty,
        correctAnswers: correctAnswersList,
        possibleAnswers: possibleAnswersList,
      };

      fetchCreateExercise(subject, exerciseType, newExercise);

      setWorkingTable(loadCreateTable());

      loadSubject(subject);
    }
  }

  function editDataSet(id: string) {
    loadEditTable(id);
  }

  function deleteDataSet(id: string) {
    fetchDeleteExercise(id);

    loadSubject(subject);
  }

  function cancelEditing() {
    setWorkingTable(loadCreateTable());
  }

  function changeData() {
    const { id, label, difficulty, correctAnswers, possibleAnswers, exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      var correctAnswersList = correctAnswers.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = possibleAnswers.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      correctAnswersList.forEach((correctAnswer) => {
        if (arrayContains(possibleAnswersList, correctAnswers) === false) {
          possibleAnswersList.push(correctAnswer);
        }
      });

      var newExercise = {
        label: label,
        difficulty: difficulty,
        correctAnswers: correctAnswersList,
        possibleAnswers: possibleAnswersList,
      };

      fetchUpdateExercise(id, exerciseType, newExercise);

      setWorkingTable(loadCreateTable());
      loadSubject(subject);
    }
  }

  function areDataValid(
    label: any,
    difficultyStr: any,
    correctAnswers: any,
    possibleAnswers: any,
    exerciseType: any
  ): boolean {
    var areValid = false;
    var invalidFields = [];

    if (difficultyStr === undefined || difficultyStr === null || difficultyStr === '')
      invalidFields.push('Schwierigkeit');

    if (label === undefined || label === null || label === '') invalidFields.push('Aufgabenstellung');

    if (correctAnswers === undefined || correctAnswers === null || correctAnswers === '')
      invalidFields.push('Richtige Antworten');

    if (
      (possibleAnswers === undefined || possibleAnswers === null || possibleAnswers === '') &&
      exerciseType === 'IChoice'
    )
      invalidFields.push('Antwortmöglichkeiten');

    if (invalidFields.length > 0) {
      alert('In folgende Felder fehlen Eingaben: ' + invalidFields.join('; '));
    } else {
      areValid = true;
    }

    return areValid;
  }

  function clearExercise() {
    return {
      id: '',
      label: '',
      difficulty: '',
      correctAnswers: '',
      possibleAnswers: '',
      exerciseType: '',
    };
  }

  function getExerciseInList(exerciseID: string): IExercise {
    var index = getIndexByExerciseID(exerciseID);
    return allExercises[index];
  }

  function getIndexByExerciseID(IdStr: string) {
    var index = 0;

    for (var exerciseIndex = 0; exerciseIndex < allExercises.length; exerciseIndex++) {
      var exercise = allExercises[exerciseIndex];
      if (exercise.id === IdStr) {
        index = exerciseIndex;
      }
    }

    return index;
  }

  function setLabel(labelInput: string) {
    workingExercise.label = labelInput;
  }

  function setDifficulty(difficultyInput: string) {
    workingExercise.difficulty = difficultyInput;
  }

  function setCorrect(correctInput: string) {
    workingExercise.correctAnswers = correctInput;
  }

  function setPossible(possibleInput: string) {
    workingExercise.possibleAnswers = possibleInput;
  }

  function setType(typeInput: string) {
    workingExercise.exerciseType = typeInput;
  }
}

export function fetchGetSubject(subjectId: string): Promise<ISubject> {
  return fetch(`api/subjects/${subjectId}`, { method: 'GET' })
    .then((response) => {
      console.dir(response);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {
      return json as ISubject;
    });
}

export function fetchDeleteExercise(exerciseId: string) {
  return fetch(`api/exercise/${exerciseId}/delete`, { method: 'DELETE' })
    .then((response) => {
      console.dir(response);
      if (response.ok) {
        return true;
      } else {
        return Promise.reject(response.status + ' ' + response.statusText);
      }
    })
    .then((json) => {});
}

export function fetchUpdateExercise(exerciseId: string, exerciseType: any, exercise: any) {
  return fetch(`api/exercise/${exerciseId}/update?exerciseType=${exerciseType}`, {
    method: 'POST',
    body: JSON.stringify(exercise),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((response) => {
      console.dir(response);
      return response.ok;
    })
    .then((json) => {});
}

export function fetchCreateExercise(exerciseId: string, exerciseType: any, newExercise: any) {
  return fetch(`api/exercise/${exerciseId}/create?exerciseType=${exerciseType}`, {
    method: 'POST',
    body: JSON.stringify(newExercise),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((response) => {
      console.dir(response);
      return response.ok;
    })
    .then((json) => {});
}

function arrayContains(array: string[], searchElement: string): boolean {
  var contains = false;

  array.forEach((element) => {
    if (element === searchElement) contains = true;
  });

  return contains;
}
