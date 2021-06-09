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
  var workingExerciseID = '';

  var subject = 'AE';
  const [allExercises, setAllExercises] = useState<IExercise[]>(Array<IExercise>());
  const [workingTable, setWorkingTable] = useState<JSX.Element>();
  const [editDifficulty, setEditDifficulty] = useState<string>('');
  const [editType, setEditType] = useState<string>('IChoice');
  const [editLabel, setEditLabel] = useState<string>('');
  const [editCorrect, setEditCorrect] = useState<string>('');
  const [editPossible, setEditPossible] = useState<string>('');

  const loadCreateTable = () => {
    var createTable = (
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
                defaultValue={editDifficulty}
                onChange={(e) => {
                  alert(e.target.value);
                  setEditDifficulty(e.target.value);
                }}
              />
            </td>
            <td>
              <select onChange={(e) => setEditType(e.target.value)}>
                <option value="IChoice">Auswahlaufgabe</option>
                <option value="ICloze">Lückentext</option>
              </select>
            </td>
            <td>
              <Tooltip title="Eingabefelder für den Lückentext werden mit _ gekennzeichnet">
                <input
                  type="text"
                  id="label"
                  placeholder="Aufgabenstellung"
                  defaultValue={editLabel}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditLabel(e.target.value);
                  }}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  id="correctAnswers"
                  placeholder="Richtige Antworten"
                  defaultValue={editCorrect}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditCorrect(e.target.value);
                  }}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  id="allChoices"
                  placeholder="Antwortmöglichkeiten"
                  defaultValue={editPossible}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditPossible(e.target.value);
                  }}
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
    setWorkingTable(createTable);
  };

  const loadEditTable = (idStr: string) => {
    const exercise = getExerciseInList(idStr);

    workingExerciseID = idStr;
    setEditDifficulty(exercise.difficulty + '');
    setEditLabel(exercise.label);
    setEditCorrect(exercise.correctAnswers.join(';'));
    setEditPossible(exercise.possibleAnswers.join(';'));

    var exerciseType = 'Unbekannt';
    if ('isDropdown' in exercise) {
      exerciseType = 'Lückentext';
      setEditType('ICloze');
    } else if ('isMultipleChoice' in exercise) {
      exerciseType = 'Auswahlaufgabe';
      setEditType('IChoice');
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
                defaultValue={editDifficulty}
                onChange={(e) => {
                  alert(e.target.value);
                  setEditDifficulty(e.target.value);
                }}
              />
            </td>
            <td id="exersiceType">{exerciseType}</td>
            <td>
              <Tooltip title="Eingabefelder für den Lückentext werden mit _ gekennzeichnet">
                <input
                  type="text"
                  id="label"
                  placeholder="Aufgabenstellung"
                  defaultValue={editLabel}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditLabel(e.target.value);
                  }}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  id="correctAnswers"
                  placeholder="Richtige Antworten"
                  defaultValue={editCorrect}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditCorrect(e.target.value);
                  }}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Mehrere Antworten werden mit ; getrennt">
                <input
                  type="text"
                  id="allChoices"
                  placeholder="Antwortmöglichkeiten"
                  defaultValue={editPossible}
                  onChange={(e) => {
                    alert(e.target.value);
                    setEditPossible(e.target.value);
                  }}
                />
              </Tooltip>
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
  };

  const renderShowingTable = () => {
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
  };

  const generateBody = () => {
    var dataRows: JSX.Element[] = [];

    allExercises.forEach((exercise) => {
      const { id, difficulty, label, correctAnswers, possibleAnswers } = exercise;
      var exerciseType = 'Lückentext';
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
  };

  const loadSubject = (subjectID: string) => {
    subject = subjectID;

    fetchGetSubject(subject)
      .then((subjectObj) => {
        setAllExercises(subjectObj.exercises);
      })
      .catch((_errorMsg) => {
        console.error(_errorMsg);
      });

    clearInputs();
    loadCreateTable();
  };

  const addDataSet = () => {
    if (areDataValid()) {
      var correctAnswersList = editCorrect.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = editPossible.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      correctAnswersList.forEach((correctAnswer) => {
        if (arrayContains(possibleAnswersList, correctAnswer) === false) {
          possibleAnswersList.push(correctAnswer);
        }
      });

      var newExercise = {
        label: editLabel,
        difficulty: editDifficulty,
        correctAnswers: correctAnswersList,
        possibleAnswers: possibleAnswersList,
      };

      fetchCreateExercise(subject, editType, newExercise);

      clearInputs();
      loadCreateTable();
      loadSubject(subject);
    }
  };

  const editDataSet = (id: string) => {
    loadEditTable(id);
  };

  const deleteDataSet = (id: string) => {
    fetchDeleteExercise(id);
    loadSubject(subject);
  };

  const cancelEditing = () => {
    clearInputs();
    loadCreateTable();
  };

  const changeData = () => {
    var oldExercise = getExerciseInList(workingExerciseID);
    var newExercise = {
      label: oldExercise.label,
      difficulty: oldExercise.difficulty + '',
      correctAnswers: oldExercise.correctAnswers,
      possibleAnswers: oldExercise.possibleAnswers,
    };

    if (areDataValid()) {
      var correctAnswersList = editCorrect.split(';');
      correctAnswersList.forEach((correctAnswer) => {
        correctAnswer.trim();
      });

      var possibleAnswersList = editPossible.split(';');
      possibleAnswersList.forEach((possibleAnswer) => {
        possibleAnswer.trim();
      });

      correctAnswersList.forEach((correctAnswer) => {
        if (arrayContains(possibleAnswersList, correctAnswer) === false) {
          possibleAnswersList.push(correctAnswer);
        }
      });

      newExercise.label = editLabel;
      newExercise.difficulty = editDifficulty;
      newExercise.correctAnswers = correctAnswersList;
      newExercise.possibleAnswers = possibleAnswersList;

      fetchUpdateExercise(workingExerciseID, editType, newExercise);
      clearInputs();
      loadCreateTable();
      loadSubject(subject);
    }
  };

  const areDataValid = () => {
    alert(editDifficulty + ' | ' + editType + ' | ' + ' | ' + editLabel + ' | ' + editCorrect + ' | ' + editPossible);
    var areValid = false;
    var invalidFields = [];

    if (editDifficulty == undefined || editDifficulty == null || editDifficulty == '')
      invalidFields.push('Schwierigkeit');

    if (editLabel == undefined || editLabel == null || editLabel == '') invalidFields.push('Aufgabenstellung');

    if (editCorrect == undefined || editCorrect == null || editCorrect == '') invalidFields.push('Richtige Antworten');

    if ((editPossible == undefined || editPossible == null || editPossible == '') && editType == 'IChoice')
      invalidFields.push('Antwortmöglichkeiten');

    if (invalidFields.length > 0) {
      alert('In folgende Felder fehlen Eingaben: ' + invalidFields.join('; '));
    } else {
      areValid = true;
    }

    return areValid;
  };

  const clearInputs = () => {
    var inputList = document.getElementById('workingArea')?.getElementsByTagName('input');
    if (inputList !== undefined) {
      for (const inputField of inputList) {
        inputField.value = '';
        inputField.defaultValue = '';
      }
    }
    setEditDifficulty('');
    //setEditType('IChoice');
    setEditLabel('');
    setEditCorrect('');
    setEditPossible('');
  };

  const getExerciseInList = (exerciseID: string) => {
    var index = getIndexByExerciseID(exerciseID);
    return allExercises[index];
  };

  const getIndexByExerciseID = (IdStr: string) => {
    var index = 0;

    for (var exerciseIndex = 0; exerciseIndex < allExercises.length; exerciseIndex++) {
      var exercise = allExercises[exerciseIndex];
      if (exercise.id === IdStr) {
        index = exerciseIndex;
      }
    }

    return index;
  };

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
    if (element.trim() == searchElement.trim()) contains = true;
  });

  return contains;
}
