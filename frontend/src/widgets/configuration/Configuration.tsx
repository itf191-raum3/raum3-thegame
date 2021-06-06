import './Configuration.css'
import deleteIcon from './delete_icon.png'
import editIcon from './edit_icon.png'
import acceptIcon from './accept_icon.png'
import addIcon from './add_icon.png'

import { IExercise } from '../../../../common/src/entities/IExercise';
import { useState } from 'react';


//fetch API()

// Aufgaben[] getallexcersise (subject)
// statusCode deleteExcesise (ID)
// statusCode update (Aufgabe)
// UUID create (Aufgabe) 
const columnNames = ["Schwierigkeit", "Aufgabentype", "Aufgabe", "Richtige Antworten", "Antwortmöglichkeiten", "", ""]

export function Configuration() {
  var subject = ""
  const [allExercises, setallExercises] = useState<IExercise[]>(Array<IExercise>())
  const [workingTable, setWorkingTable] = useState<JSX.Element>()

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
              <option value="choice">Auswahlaufgabe</option>
              <option value="cloze">Lückentext</option>
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
    
    var selectCloze = false
    var selectChoice = false
    if('isDropdown' in exercise)
      selectCloze = true
    else if('isMultipleChoice' in exercise)
      selectChoice = true

    var editTabel = 
      <table id="editTabel">
        <thead>
          {generateHeader()}
        </thead>
        <tbody>
          <tr className="information">
            <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" value ={difficulty}/></td>
            <td><select id="exersiceType">
                <option value="choice" selected={selectChoice}>Auswahlaufgabe</option>
                <option value="cloze" selected={selectCloze}>Lückentext</option>
              </select></td>
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
     }).catch(errorMsg => {
       console.error("Error")
     })

    setWorkingTable(loadCreateTable())
  }

  function addDataSet(){
    var difficulty = document.getElementById("difficulty")?.nodeValue
    var exersiceType = document.getElementById("exersiceType")?.nodeValue
    var label = document.getElementById("label")?.nodeValue
    var correctAnswers = document.getElementById("correctAnswers")?.nodeValue?.split(";")
    var possibleAnswers = document.getElementById("possibleAnswers")?.nodeValue?.split(";")

    if(correctAnswers == undefined)
     correctAnswers = []
    
    correctAnswers.forEach(correctAnswer => {
      correctAnswer.trim();
    });

    if(possibleAnswers == undefined)
    possibleAnswers = []
    
    possibleAnswers.forEach(possibleAnswer => {
      possibleAnswer.trim();
    });

    var newExercise = {
        label: label,
        difficulty: difficulty,
        correctAnswers: correctAnswers,
        possibleAnswers: possibleAnswers,
      }

    //TODO: Insert in database

    loadSubject(subject)

    setWorkingTable(loadCreateTable())
  }

  function editDataSet(id: string):any{
    loadEditTable(id)
  }

  function deleteDataSet(id: string) : any{
    var deleteIndex = getIndexByExerciseID(id)

    //TODO: Delete element in database
    var tempList = new Array<IExercise>()
    for(var exerciseIndex = 0; exerciseIndex<allExercises.length; exerciseIndex++){
      if(exerciseIndex !== deleteIndex){
        tempList.push(allExercises[exerciseIndex])
      }
    }

    setallExercises(tempList)
  }

  function cancelEditing(){
    setWorkingTable(<table>{generateHeader()}</table>)
    setWorkingTable(loadCreateTable())
  }

  function changeData(){
    //TODO: get new values
    //TODO: update Database


    setWorkingTable(loadCreateTable())
    loadSubject(subject)
  }

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

export function fetchUpdateExercise(exerciseId: string) {
  return fetch('/exercise/?id=' + exerciseId, { method: 'PUT' }).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {
    
  });
}

export function fetchCreateExercise(subjectId: string) {
  return fetch('/subject/exercises/?id=' + subjectId, { method: 'GET' }).then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status + ' ' + response.statusText);
    }
  }).then((json) => {

  });
}