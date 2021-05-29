import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png'
import './Configuration.css'
import { AppBar, Tab, Table, Tabs } from "@material-ui/core";
import { IExercise } from '../../../../common/src/entities/IExercise';
import { render } from '@testing-library/react';


//fetch API()

// Aufgaben[] getallexcersise (subject)
// statusCode deleteExcesise (ID)
// statusCode update (Aufgabe)
// UUID create (Aufgabe) 
const columnNames = ["Schwierigkeit", "Aufgabe", "Richtige Antworten", "Antwortmöglichkeiten", "", ""]
var allExercises = new Array<IExercise>()

function loadEditTable(idStr:string){
  const exercise = getExerciseInList(idStr)
  const {id, difficulty, label, correctAnswers, possibleAnswers} = exercise
  var manantoryRows = 
    <table className="editTabel">
      <tr>
        <th>Schwierigkeit</th>
        <th>Aufgabe</th>
        <th>Richtige Antworten</th>
        <th>Antwortmöglichkeiten</th>
      </tr>
      <tr className="information">
        <td><input type="text" id="difficultyChange" placeholder={difficulty+""}/></td>
        <td><input type="text" id="labelChange" placeholder={label}/></td>
        <td><input type="text" id="correctAnswers" placeholder={correctAnswers.join("; ")}/></td>
        <td><input type="text" id="allChoices" placeholder={possibleAnswers.join("; ")}/></td>
        <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
        <td><img src={acceptIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (changeData())}/></td>
      </tr>
      <tr className="moreAnswers">
        <td/>
        <td/>
        <td className="correctAnswers"><input type="text" id="correctAnswers" placeholder="Richtige Antworte"/></td>
        <td className="allChoices"><input type="text" id="allChoices" placeholder="Antwortmöglichkeit"/></td>
      </tr>
    </table>

  var optionalRow =
    <tr className="moreAnswers">
      <td/>
      <td/>
      <td className="correctAnswers"><input type="text" id="correctAnswers" placeholder="Richtige Antworte"/></td>
      <td className="allChoices"><input type="text" id="allChoices" placeholder="Antwortmöglichkeit"/></td>
    </tr>

    return(manantoryRows)
}

function getExerciseInList(exerciseID: string): IExercise{
  allExercises.forEach(exercise => {
    if(exercise.id === exerciseID){
      return exercise;
    }
  })
  return {id:"undefined", difficulty:0, label:"undefined", correctAnswers:["undefined"], possibleAnswers:["undefined"]}
}

function loadTableStructure(tableName: string){
  return(
    <table id={tableName}>
      <thead>
        {generateHeader()}
      </thead>
      <tbody>

      </tbody>
    </table>
  );
}

function renderShowingTabel(tableName:string){
  return(
    <table id={tableName}>
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

  for (var exerciseIndex = 0; exerciseIndex < allExercises.length; exerciseIndex++) {
    const {difficulty, label, correctAnswers, possibleAnswers} = allExercises[exerciseIndex];
    dataRows.push(
      <tr key={exerciseIndex}>
        <td key={difficulty}>{difficulty}</td>
        <td key={label}>{label}</td>
        <td key={correctAnswers.join("")}>{correctAnswers.join("<br/>")}</td>
        <td key={possibleAnswers.join("")}>{possibleAnswers.join("<br/>")}</td>
        <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={deleteDataSet(exerciseIndex+"")}/></td>
        <td><img src={editIcon} alt="Bearbeiten" className="bntLogo" onClick={editDataSet(exerciseIndex+"")}/></td>
      </tr>
    )
  }

  return dataRows;
}

function loadDataTable() {
  var emptyTable = document.getElementById("showingTabel");
  emptyTable?.getElementsByTagName("tbody").item(0)?.remove()

  var tabelBody = <tbody>{generateBody()}</tbody>
}

const loadAE = () =>{
  loadSubject("AE")
}

const loadITS = () =>{
  loadSubject("ITS")
}

const loadD = () =>{
  loadSubject("D")
}

function loadSubject (subject: string){
  allExercises = [
    { id: "123",
      label: "Was!",
      difficulty: 1,
      correctAnswers: ["2"],
      possibleAnswers: ["3"],
    }
  ]
  loadDataTable()

// bekomme von server Aufgaben[]
}

function addDataSet(){
  
}

function editDataSet(id: string):any{
  loadEditTable(id);
}

function deleteDataSet(_id: string) : any{

}

function cancelEditing(){

}

function changeData(){

}

export function Configuration() {
  return (
    <div className="Configuration">
      <header className="Config-GUI">
        
      </header>
      <body>
        <div id="menu">
          <AppBar position="static">
          <Tabs value={"subject"} aria-label="simple tabs example">
            <Tab label="Software-Entwicklung"  onClick={loadAE}/>
            <Tab label="Netzwerk-Technik" onClick={loadITS}/>
            <Tab label="Deutsch" onClick={loadD}/>
          </Tabs>
          </AppBar>
        </div>
        <div>
          {loadTableStructure("workingTable")}
          <br /><br />
        </div>
        <div>
          {renderShowingTabel("showingTabel")}
        </div>
      </body>
    </div>
  );
}
