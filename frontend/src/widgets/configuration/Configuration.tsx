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
const columnNames = ["Schwierigkeit", "Aufgabe", "Richtige Antworten", "Antwortmöglichkeiten", "", ""]

export function Configuration() {
  const [allExercises, setallExercises] = useState<IExercise[]>(Array<IExercise>())
  const [workingTable, setWorkingTable] = useState<JSX.Element>()

  function loadCreateTable(){
    var createTabel = 
      <table id="editTabel">
        <thead>
          {generateHeader()}
        </thead>
        <tbody>
          <tr className="information">
            <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" value=""/></td>
            <td><input type="text" id="label" placeholder="Aufgabenstellung" value=""/></td>
            <td><input type="text" id="correctAnswers" placeholder="Richtige Antworten" value=""/></td>
            <td><input type="text" id="allChoices" placeholder="Antwortmöglichkeiten" value=""/></td>
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
    
    var editTabel = 
      <table id="editTabel">
        <thead>
          {generateHeader()}
        </thead>
        <tbody>
          <tr>
            <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit" value={difficulty}/></td>
            <td><input type="text" id="label" placeholder="Aufgabenstellung" value={label}/></td>
            <td><input type="text" id="correctAnswers" placeholder="Richtige Antworten" value={correctAnswers.join("; ")}/></td>
            <td><input type="text" id="allChoices" placeholder="Antwortmöglichkeiten" value={possibleAnswers.join("; ")}/></td>
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
      
      dataRows.push(
        <tr id={id}>
          <td>{difficulty}</td>
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

  function loadSubject (subject: string){
     // TODO: bekomme von server Aufgaben[]
     var tempList = []
     tempList.push(
      { id: "123",
        label: "Was!",
        difficulty: 1,
        correctAnswers: ["2"],
        possibleAnswers: ["3"],
      }
    )

    tempList.push(
      { id: "Test",
        label: "Test123!",
        difficulty: 2,
        correctAnswers: ["Ja"],
        possibleAnswers: ["Nei"],
      }
    )

    setWorkingTable(loadCreateTable())
    setallExercises(tempList)
  }

  function addDataSet(){
    //TODO: Get values
    //TODO: Create exercise
    //TODO: Insert in database -> set ID

    setWorkingTable(loadCreateTable())
    //loadDataTable()
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
    setWorkingTable(loadCreateTable())
  }

  function changeData(){
    //TODO: get new values
    //TODO: update Database


    setWorkingTable(loadCreateTable())
    //loadDataTable()
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
