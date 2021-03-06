import './Configuration.css';
import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png';
import addIcon from './add_icon.png';

import { IExercise } from '../../../../common/src/entities/IExercise';
import { useState } from 'react';
import { ISubject } from '../../../../common/src/entities/ISubject';
import { Tooltip, TableContainer, Paper, Table } from '@material-ui/core';

export function Configuration() {
  var workingExercise = clearExercise();

  const [subject] = useState<string>('AE');
  const [allExercises, setAllExercises] = useState<IExercise[]>(Array<IExercise>());
  const [workingTable, setWorkingTable] = useState<JSX.Element>();

  return (
    <div className="Configuration">
      <div id="menu">
        <ul>
          <li>
            <button
              className="navBtn"
              onClick={() => {
                loadSubject();
              }}
            >
              Anwendungsentwicklung
            </button>
          </li>
        </ul>
      </div>
      <div>
        {workingTable}
        <br />
        <br />
      </div>
      <div>{renderShowingTable()}</div>
    </div>
  );

  function loadCreateTable() {
    workingExercise = clearExercise();
    setType('IChoice');

    return (
      <table id="createTabel">
        <thead>
          <th className="working">Schwierigkeit</th>
          <th className="working">Aufgabentype</th>
          <th className="working">Aufgabe</th>
          <th className="working">Richtige Antworten</th>
          <th className="working">Antwortmöglichkeiten</th>
          <th className="working"></th>
          <th className="working"></th>
        </thead>
        <tbody>
          <tr>
            <td className="working">
              <input
                type="number"
                min="0"
                placeholder="Schwierigkeit"
                defaultValue={workingExercise.difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </td>
            <td className="working">
              <select onChange={(e) => setType(e.target.value)}>
                <option value="IChoice">Auswahlaufgabe</option>
                <option value="ICloze">Lückentext</option>
              </select>
            </td>
            <td className="working">
              <Tooltip title="Eingabefelder für den Lückentext werden mit _ gekennzeichnet">
                <input
                  type="text"
                  placeholder="Aufgabenstellung"
                  defaultValue={workingExercise.label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Tooltip>
            </td>
            <td className="working">
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  placeholder="Richtige Antworten"
                  defaultValue={workingExercise.correctAnswers}
                  onChange={(e) => setCorrect(e.target.value)}
                />
              </Tooltip>
            </td>
            <td className="working">
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  placeholder="Antwortmöglichkeiten"
                  defaultValue={workingExercise.possibleAnswers}
                  onChange={(e) => setPossible(e.target.value)}
                />
              </Tooltip>
            </td>
            <td className="working">
              <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => cancelEditing()} />
            </td>
            <td className="working">
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
          <th className="working">Schwierigkeit</th>
          <th className="working">Aufgabentype</th>
          <th className="working">Aufgabe</th>
          <th className="working">Richtige Antworten</th>
          <th className="working">Antwortmöglichkeiten</th>
          <th className="working"></th>
          <th className="working"></th>
        </thead>
        <tbody>
          <tr>
            <td className="working">
              <input
                type="number"
                min="0"
                id="difficulty"
                placeholder="Schwierigkeit"
                defaultValue={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </td>
            <td className="working">{exerciseType}</td>
            <td className="working">
              <input
                type="text"
                id="label"
                placeholder="Aufgabenstellung"
                defaultValue={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </td>
            <td className="working">
              <input
                type="text"
                id="correctAnswers"
                placeholder="Richtige Antworten"
                defaultValue={correctAnswers.join('; ')}
                onChange={(e) => setCorrect(e.target.value)}
              />
            </td>
            <td className="working">
              <input
                type="text"
                id="allChoices"
                placeholder="Antwortmöglichkeiten"
                defaultValue={possibleAnswers.join('; ')}
                onChange={(e) => setPossible(e.target.value)}
              />
            </td>
            <td className="working">
              <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => cancelEditing()} />
            </td>
            <td className="working">
              <img src={acceptIcon} alt="Bearbeiten" className="bntLogo" onClick={() => changeData()} />
            </td>
          </tr>
        </tbody>
      </table>
    );

    setWorkingTable(editTabel);
  }

  function renderShowingTable() {
    var showingTable = (
      <TableContainer component={Paper} className="tableCell" style={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <thead>
            <tr>
              <th className="showing">Schwierigkeit</th>
              <th className="showing">Aufgabentype</th>
              <th className="showing">Aufgabe</th>
              <th className="showing">Richtige Antworten</th>
              <th className="showing">Antwortmöglichkeiten</th>
              <th className="showing"></th>
              <th className="showing"></th>
            </tr>
          </thead>
          <tbody>{generateBody()}</tbody>
        </Table>
      </TableContainer>
    );

    return showingTable;
  }

  function generateBody() {
    var dataRows: JSX.Element[] = [];

    allExercises.forEach((exercise) => {
      const { id, difficulty, label, correctAnswers, possibleAnswers } = exercise;
      var exerciseType = 'Unbekannt';
      if ('isDropdown' in exercise) exerciseType = 'Lückentext';
      else if ('isMultipleChoice' in exercise) exerciseType = 'Auswahlaufgabe';

      dataRows.push(
        <tr key={id}>
          <td className="showing">{difficulty}</td>
          <td className="showing">{exerciseType}</td>
          <td className="showing">{label}</td>
          <td className="showing">{correctAnswers.join(' | ')}</td>
          <td className="showing">{possibleAnswers.join(' | ')}</td>
          <td className="img showing">
            <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => deleteDataSet(id)} />
          </td>
          <td className="img showing">
            <img src={editIcon} alt="Bearbeiten" className="bntLogo" onClick={() => editDataSet(id)} />
          </td>
        </tr>
      );
    });

    return dataRows;
  }

  function loadSubject() {
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
    var correctAnswersList = formatInput(workingExercise.correctAnswers, true) as string[];
    correctAnswersList = cleanArray(correctAnswersList) as string[];

    var possibleAnswersList = formatInput(workingExercise.possibleAnswers, true) as string[];
    possibleAnswersList = mergeArrayAInArrayB(correctAnswersList, possibleAnswersList);
    possibleAnswersList = cleanArray(possibleAnswersList);

    var newExercise = {
      label: formatInput(workingExercise.label, false),
      difficulty: workingExercise.difficulty,
      correctAnswers: correctAnswersList,
      possibleAnswers: possibleAnswersList,
    };

    const { label, difficulty, correctAnswers, possibleAnswers } = newExercise;
    const { exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      fetchCreateExercise(subject, exerciseType, newExercise);

      setWorkingTable(loadCreateTable());

      loadSubject();
    }
  }

  function editDataSet(id: string) {
    loadEditTable(id);
  }

  function deleteDataSet(id: string) {
    fetchDeleteExercise(id);

    loadSubject();
  }

  function cancelEditing() {
    setWorkingTable(loadCreateTable());
  }

  function changeData() {
    var correctAnswersList = formatInput(workingExercise.correctAnswers, true) as string[];
    correctAnswersList = cleanArray(correctAnswersList) as string[];

    var possibleAnswersList = formatInput(workingExercise.possibleAnswers, true) as string[];
    possibleAnswersList = mergeArrayAInArrayB(correctAnswersList, possibleAnswersList);
    possibleAnswersList = cleanArray(possibleAnswersList);

    var newExercise = {
      label: formatInput(workingExercise.label, false),
      difficulty: workingExercise.difficulty,
      correctAnswers: correctAnswersList,
      possibleAnswers: possibleAnswersList,
    };
    const { label, difficulty, correctAnswers, possibleAnswers } = newExercise;
    const { id, exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      fetchUpdateExercise(id, exerciseType, newExercise);

      setWorkingTable(loadCreateTable());
      loadSubject();
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

    if (correctAnswers === undefined || correctAnswers === null || correctAnswers.join('') === '')
      invalidFields.push('Richtige Antworten');

    if (
      (possibleAnswers === undefined || possibleAnswers === null || possibleAnswers.join('') === '') &&
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

  function formatInput(input: string, doSplit: boolean): string | string[] {
    var output;
    input = input.replace(/\s+/g, ' ');

    if (doSplit) {
      output = [];
      var inputArray = input.split(';');
      inputArray.forEach((inputPart) => {
        output.push(inputPart.trim());
      });
    } else {
      output = input.trim();
    }

    return output;
  }

  function mergeArrayAInArrayB(correctAnswersArray: any[], allChoicesArray: any[]): any[] {
    correctAnswersArray.forEach((correctAnswer) => {
      if (arrayContains(allChoicesArray, correctAnswer) === false) {
        allChoicesArray.push(correctAnswer);
      }
    });

    return allChoicesArray;
  }

  function cleanArray(array: any[]): any[] {
    var cleanArray: any[] = [];

    array.forEach((element) => {
      // eslint-disable-next-line eqeqeq
      if (arrayContains(cleanArray, element) == false && element != '') cleanArray.push(element);
    });

    return cleanArray;
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

function arrayContains(array: any[], searchElement: any): boolean {
  var contains = false;

  array.forEach((element) => {
    // eslint-disable-next-line eqeqeq
    if (element == searchElement) contains = true;
  });

  return contains;
}
