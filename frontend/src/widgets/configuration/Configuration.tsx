import './Configuration.css'
import deleteIcon from './delete_icon.png'
import editIcon from './edit_icon.png'
import acceptIcon from './accept_icon.png'
import addIcon from './add_icon.png'

import { IExercise } from '../../../../common/src/entities/IExercise'
import { useState } from 'react'


const columnNames = ["Schwierigkeit", "Aufgabentype", "Aufgabe", "Richtige Antworten", "Antwortmöglichkeiten", "", ""]

export function Configuration() {
  var subject = ""
  const [allExercises, setallExercises] = useState<IExercise[]>(Array<IExercise>())
  const [workingTable, setWorkingTable] = useState<JSX.Element>()

  return (
    <div className="Configuration">
      <header className="Config-GUI">
        
      </header>
      <body>
        <div id="menu">
          <ul>
            <li><button className="navBtn" onClick={() => loadSubject("AE")}>Anwendungsentwicklung </button></li>
          </ul>
        </div>
        <div >
          {workingTable}
          <br /><br />
        </div>
        <div>
          {renderShowingTabel()}
        </div>
      </body>
    </div>
  );

  function loadCreateTable(){
    var createTabel = 
      <table id="createTabel">
        <thead>
          {generateHeader()}
        </thead>
        <tbody>
          <tr className="information">
            <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" defaultValue=""/></td>
            <td><select id="exersiceType">
              <option value="IChoice">Auswahlaufgabe</option>
              <option value="ICloze">Lückentext</option>
            </select>
            </td>
            <td><input type="text" id="label" placeholder="Aufgabenstellung" defaultValue=""/></td>
            <td><input type="text" id="correctAnswers" placeholder="Richtige Antworten" defaultValue=""/></td>
            <td><input type="text" id="allChoices" placeholder="Antwortmöglichkeiten" defaultValue=""/></td>
            <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
            <td><img src={addIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (addDataSet())}/></td>
          </tr>
        </tbody>
      </table>

    return(createTabel)
  }

  function loadEditTable(idStr:string){
    const exercise = getExerciseInList(idStr)
    const {difficulty, label, correctAnswers, possibleAnswers} = exercise
    
    var exerciseType = "Unbekannt"
      if('isDropdown' in exercise)
        exerciseType = "Lückentext"
      else if('isMultipleChoice' in exercise)
        exerciseType = "Auswahlaufgabe"

    var editTabel = 
      <table id="editTabel">
        <thead>
          {generateHeader()}
        </thead>
        <tbody>
          <tr className="information">
            <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" value ={difficulty}/></td>
            <td>{exerciseType}</td>
            <td><input type="text" id="label" placeholder="Aufgabenstellung" value ={label}/></td>
            <td><input type="text" id="correctAnswers" placeholder="Richtige Antworten" value ={correctAnswers.join("; ")}/></td>
            <td><input type="text" id="allChoices" placeholder="Antwortmöglichkeiten" value ={possibleAnswers.join("; ")}/></td>
            <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
            <td><img src={acceptIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (changeData())}/></td>
          </tr>
        </tbody>
      </table>
    
    setWorkingTable(editTabel)
  }

  function renderShowingTabel(){
    return(
      <table id="showingTabel">
        <thead>
          <tr>
            {generateHeader()}
          </tr>
        </thead>
        <tbody>
          {generateBody()}
        </tbody>
      </table>
    )
  }

  function generateHeader(){
    var headerRow: JSX.Element[] = []

    columnNames.forEach(columnName => {
      headerRow.push(<th id={columnName}>{columnName}</th>)
    });

    return headerRow;
  }

  function generateBody(){
    var dataRows: JSX.Element[] = []

    allExercises.forEach(exercise => {
      const {id, difficulty, label, correctAnswers, possibleAnswers} = exercise;
      var exerciseType = "Unbekannt"
      if('isDropdown' in exercise)
        exerciseType = "Lückentext"
      else if('isMultipleChoice' in exercise)
        exerciseType = "Auswahlaufgabe"

      dataRows.push(
        <tr id={id}>
          <td>{difficulty}</td>
          <td>{exerciseType}</td>
          <td>{label}</td>
          <td>{correctAnswers.join("<br/>")}</td>
          <td>{possibleAnswers.join("<br/>")}</td>
          <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => deleteDataSet(id)}/></td>
          <td><img src={editIcon} alt="Bearbeiten" className="bntLogo" onClick={() => editDataSet(id)}/></td>
        </tr>
      )
    });

    return dataRows;
  }

  function loadSubject (subjectID: string){
    subject = subjectID

     
     fetchGetAllExercise(subject).then(exercise => {
      setallExercises(exercise)
     }).catch(_errorMsg => {
       
       console.error(_errorMsg)
     })

    setWorkingTable(loadCreateTable())
  }

  function addDataSet(){
    var difficultyStr = document.getElementById("difficulty")?.nodeValue
    var exerciseType = document.getElementById("exersiceType")?.nodeValue
    var label = document.getElementById("label")?.nodeValue
    var correctAnswers = document.getElementById("correctAnswers")?.nodeValue?.split(";")
    var possibleAnswers = document.getElementById("possibleAnswers")?.nodeValue?.split(";")

    if (difficultyStr===undefined || difficultyStr===null)
      difficultyStr = "0"

    var difficulty : number =+ difficultyStr

    if(exerciseType===undefined || exerciseType===null)
      exerciseType= ""

    if(label===undefined|| label===null)
      label= ""

    if(correctAnswers === undefined)
     correctAnswers = []
    
    correctAnswers.forEach(correctAnswer => {
      correctAnswer.trim();
    });

    if(possibleAnswers === undefined)
    possibleAnswers = []
    
    possibleAnswers.forEach(possibleAnswer => {
      possibleAnswer.trim();
    });

    var newExercise = {
      label: label,
      difficulty: difficulty,
      correctAnswers: correctAnswers,
      possibleAnswers: possibleAnswers
    }

    fetchCreateExercise(subject, newExercise)

    loadSubject(subject)

    setWorkingTable(loadCreateTable())
  }

  function editDataSet(id: string){
    loadEditTable(id)
  }

  function deleteDataSet(id: string){
    fetchDeleteExercise(id)

    loadSubject(subject)
  }

  function cancelEditing(){
    setWorkingTable(loadCreateTable())
  }

  function changeData(){
    var difficultyStr = document.getElementById("difficulty")?.nodeValue
    var label = document.getElementById("label")?.nodeValue
    var correctAnswers = document.getElementById("correctAnswers")?.nodeValue?.split(";")
    var possibleAnswers = document.getElementById("possibleAnswers")?.nodeValue?.split(";")

    if (difficultyStr===undefined || difficultyStr===null)
    difficultyStr = "0"

    var difficulty : number =+ difficultyStr


    if(label===undefined|| label===null)
      label= ""

    if(correctAnswers === undefined)
      correctAnswers = []
    
    correctAnswers.forEach(correctAnswer => {
      correctAnswer.trim();
    });

    if(possibleAnswers === undefined)
      possibleAnswers = []
    
    possibleAnswers.forEach(possibleAnswer => {
      possibleAnswer.trim();
    });

    var newExercise = {
      label: label,
      difficulty: difficulty,
      correctAnswers: correctAnswers,
      possibleAnswers: possibleAnswers
    }

    fetchUpdateExercise(subject, newExercise)


    setWorkingTable(loadCreateTable())
    loadSubject(subject)
  }

  function getExerciseInList(exerciseID: string): IExercise{
    var index = getIndexByExerciseID(exerciseID)
    return allExercises[index]
  }

  function getIndexByExerciseID(IdStr: string){
    var index = 0

    for (var exerciseIndex = 0; exerciseIndex < allExercises.length; exerciseIndex++) {
      var exercise = allExercises[exerciseIndex]
      if(exercise.id === IdStr){
        index = exerciseIndex
      }
    }

    return index
  }
}

export function fetchGetAllExercise(subjectId: string): Promise<IExercise[]> {
  return fetch('/subject/exercises/?id=' + subjectId, { method: 'GET' }).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {
    return json as IExercise[];
  });
}

export function fetchDeleteExercise(exerciseId: string) {
  return fetch('/exercise/?id=' + exerciseId, { method: 'DELETE' }).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {
    
  });
}

export function fetchUpdateExercise(exerciseId: string, exercise:any) {
  return fetch('/exercise/?id=' + exerciseId, { method: 'PUT', body:JSON.stringify(exercise)}).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {
    
  });
}

export function fetchCreateExercise(subjectId: string, newExercise:any) {
  return fetch('/exercise/?id=' + subjectId, { method: 'POST', body:JSON.stringify(newExercise)}).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {

  });
}