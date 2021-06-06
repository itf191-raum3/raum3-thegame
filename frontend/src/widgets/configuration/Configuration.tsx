import './Configuration.css';
import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png';
import addIcon from './add_icon.png';

import { IExercise } from '../../../../common/src/entities/IExercise';
import { useState } from 'react';
import { ISubject } from '../../../../common/src/entities/ISubject';

const columnNames = ['Schwierigkeit', 'Aufgabentype', 'Aufgabe', 'Richtige Antworten', 'Antwortmöglichkeiten', '', ''];

export function Configuration() {
  var workingExercise = clearExercise();

  var subject = '';
  const [allExercises, setallExercises] = useState<IExercise[]>(Array<IExercise>());
  const [workingTable, setWorkingTable] = useState<JSX.Element>();

  return (
    <div className="Configuration">
      <header className="Config-GUI"></header>
      <body>
        <div id="menu">
          <ul>
            <li>
              <button className="navBtn" onClick={() => loadSubject('AE')}>
                Anwendungsentwicklung{' '}
              </button>
            </li>
          </ul>
        </div>
        <div>
          {workingTable}
          <br />
          <br />
        </div>
        <div>{renderShowingTabel()}</div>
      </body>
    </div>
  );

  function loadCreateTable() {
    workingExercise = clearExercise();
    setType('IChoice');

    var createTabel = (
      <table id="createTabel">
        <thead>{generateHeader()}</thead>
        <tbody>
          <tr className="information">
            <td>
              <input
                type="number"
                min="0"
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
              <input
                type="text"
                placeholder="Aufgabenstellung"
                defaultValue={workingExercise.label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Richtige Antworten"
                defaultValue={workingExercise.correctAnswers}
                onChange={(e) => setCorrect(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Antwortmöglichkeiten"
                defaultValue={workingExercise.possibleAnswers}
                onChange={(e) => setPossible(e.target.value)}
              />
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

    return createTabel;
  }

  function loadEditTable(idStr: string) {
    workingExercise = clearExercise();
    const exercise = getExerciseInList(idStr);
    const { difficulty, label, correctAnswers, possibleAnswers } = exercise;

    workingExercise.id = idStr
    setDifficulty(difficulty+"")
    setLabel(label)
    setCorrect(correctAnswers.join("; "))
    setPossible(possibleAnswers.join("; "))

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
        <thead>{generateHeader()}</thead>
        <tbody>
          <tr className="information">
            <td>
              <input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" defaultValue={workingExercise.difficulty} />
            </td>
            <td id="exersiceType">{exerciseType}</td>
            <td>
              <input type="text" id="label" placeholder="Aufgabenstellung" defaultValue={workingExercise.label} />
            </td>
            <td>
              <input
                type="text"
                id="correctAnswers"
                placeholder="Richtige Antworten"
                defaultValue={workingExercise.correctAnswers}
              />
            </td>
            <td>
              <input
                type="text"
                id="allChoices"
                placeholder="Antwortmöglichkeiten"
                defaultValue={workingExercise.possibleAnswers}
              />
            </td>
            <td>
              <img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => cancelEditing()} />
            </td>
            <td>
              <img src={acceptIcon} alt="Bearbeiten" className="bntLogo" onClick={() => changeData()} />
            </td>
          </tr>
        </tbody>
      </table>
    );

    setWorkingTable(editTabel);
  }

  function renderShowingTabel() {
    return (
      <table id="showingTabel">
        <thead>
          <tr>{generateHeader()}</tr>
        </thead>
        <tbody>{generateBody()}</tbody>
      </table>
    );
  }

  function generateHeader() {
    var headerRow: JSX.Element[] = [];

    columnNames.forEach((columnName) => {
      headerRow.push(<th id={columnName}>{columnName}</th>);
    });

    return headerRow;
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
          <td>{correctAnswers.join('\n')}</td>
          <td>{possibleAnswers.join('\n')}</td>
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
        setallExercises(subjectObj.exercises);
      })
      .catch((_errorMsg) => {
        console.error(_errorMsg);
      });

    setWorkingTable(loadCreateTable());
  }

  function addDataSet() {
    const {label, difficulty, correctAnswers, possibleAnswers, exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      var correctAnswersList = correctAnswers.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = possibleAnswers.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      var newExercise = {
        label: label,
        difficulty: difficulty,
        correctAnswers: correctAnswersList,
        possibleAnswers: possibleAnswersList,
      };

      fetchCreateExercise(subject, exerciseType, newExercise);

      loadSubject(subject);
      setWorkingTable(loadCreateTable());
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
    const {id, label, difficulty, correctAnswers, possibleAnswers, exerciseType } = workingExercise;

    if (areDataValid(label, difficulty, correctAnswers, possibleAnswers, exerciseType)) {
      var correctAnswersList = correctAnswers.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = possibleAnswers.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      var newExercise = {
        label: label,
        difficulty: difficulty,
        correctAnswers: correctAnswersList,
        possibleAnswers: possibleAnswersList,
      };

      fetchUpdateExercise(id, newExercise);

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
    var clearExercise = {
      id: '',
      label: '',
      difficulty: '',
      correctAnswers: '',
      possibleAnswers: '',
      exerciseType: '',
    };

    return clearExercise;
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
  return fetch('api/subjects/' + subjectId, { method: 'GET' })
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
  return fetch('api/exercise/' + exerciseId, { method: 'DELETE' })
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

export function fetchUpdateExercise(exerciseId: string, exercise: any) {
  return fetch('api/exercise/' + exerciseId, { method: 'PUT', body: JSON.stringify(exercise), headers : {'Content-Type': 'application/json', 'Accept': 'application/json'}})
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

export function fetchCreateExercise(exerciseId: string, exerciseType: any, newExercise: any) {
  return fetch('api/exercise/' + exerciseId + '?exerciseType=' + exerciseType, {method: 'POST', body: JSON.stringify(newExercise), headers : {'Content-Type': 'application/json', 'Accept': 'application/json'}})
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
