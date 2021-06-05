import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png'
import addIcon from './add_icon.png'
import './Configuration.css'
import { IExercise } from '../../../../common/src/entities/IExercise';
import { renderToStaticMarkup } from "react-dom/server"


//fetch API()

// Aufgaben[] getallexcersise (subject)
// statusCode deleteExcesise (ID)
// statusCode update (Aufgabe)
// UUID create (Aufgabe) 
const columnNames = ["Schwierigkeit", "Aufgabe", "Richtige Antworten", "Antwortmöglichkeiten", "", ""]
var allExercises = new Array<IExercise>()

function loadCreateTable(){
  var emptyTable = document.getElementById("workingTable");
  emptyTable?.getElementsByTagName("tbody").item(0)?.remove()

  var manantoryRows = 
    <tr className="information">
      <td><input type="number" min="0" id="difficulty" placeholder="Schwierigkeit"/></td>
      <td><input type="text" id="label" placeholder="Aufgabenstellung"/></td>
      <td><input type="text" id="correctAnswers" placeholder="Richtige Antworten"/></td>
      <td><input type="text" id="allChoices" placeholder="Antwortmöglichkeiten"/></td>
      <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
      <td><img src={addIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (addDataSet())}/></td>
    </tr>

  var tabelBody = renderToStaticMarkup(<tbody>{manantoryRows}</tbody>)
  emptyTable?.insertAdjacentHTML('beforeend', tabelBody)
}

function loadEditTable(idStr:string){
  const exercise = getExerciseInList(idStr)
  const {difficulty, label, correctAnswers, possibleAnswers} = exercise
  var manantoryRows = 
       <tr className="information">
        <td><input type="number" min="0" id="difficultyChange" value={difficulty+""}/></td>
        <td><input type="text" id="labelChange" value={label}/></td>
        <td><input type="text" id="correctAnswers" value={correctAnswers.join("; ")}/></td>
        <td><input type="text" id="allChoices" value={possibleAnswers.join("; ")}/></td>
        <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
        <td><img src={acceptIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (changeData())}/></td>
      </tr>

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
  var index = getIndexByExerciseID(exerciseID)
  return allExercises[index]
}

function getIndexByExerciseID(IdStr: string){
  var index = -1

  for (var exerciseIndex = 0; exerciseIndex < allExercises.length; exerciseIndex++) {
    var exercise = allExercises[exerciseIndex]
    if(exercise.id === IdStr){
      index = exerciseIndex
    }
  }

  return index
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
    const {id, difficulty, label, correctAnswers, possibleAnswers} = allExercises[exerciseIndex];
    dataRows.push(
      <tr id={id}>
        <td key={difficulty}>{difficulty}</td>
        <td key={label}>{label}</td>
        <td key={correctAnswers.join("")}>{correctAnswers.join("<br/>")}</td>
        <td key={possibleAnswers.join("")}>{possibleAnswers.join("<br/>")}</td>
        <td><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={deleteDataSet(id)}/></td>
        <td><img src={editIcon} alt="Bearbeiten" className="bntLogo" onClick={editDataSet(id)}/></td>
      </tr>
    )
  }

  return dataRows;
}

function loadDataTable() {
  var emptyTable = document.getElementById("showingTabel");
  emptyTable?.getElementsByTagName("tbody").item(0)?.remove()

  var tabelBody = renderToStaticMarkup(<tbody>{generateBody()}</tbody>)
  emptyTable?.insertAdjacentHTML('beforeend', tabelBody)
}

function loadSubject (subject: string){
  allExercises = [] // TODO: bekomme von server Aufgaben[]
  allExercises.push(
    { id: "123",
      label: "Was!",
      difficulty: 1,
      correctAnswers: ["2"],
      possibleAnswers: ["3"],
    }
  )

  allExercises.push(
    { id: "Test",
      label: "Test123!",
      difficulty: 2,
      correctAnswers: ["Ja"],
      possibleAnswers: ["Nei"],
    }
  )
  loadDataTable()
}

function addDataSet(){
  //TODO: Get values
  //TODO: Create exercise
  //TODO: Insert in database -> set ID

  loadCreateTable()
  //loadDataTable()
}

function editDataSet(id: string):any{
  var emptyTable = document.getElementById("workingTable");
  emptyTable?.getElementsByTagName("tbody").item(0)?.remove()

  var tabelBody = renderToStaticMarkup(<tbody>{loadEditTable(id)}</tbody>)
  emptyTable?.insertAdjacentHTML('beforeend', tabelBody)

  loadCreateTable()
}

function deleteDataSet(id: string) : any{
  var exerciseIndex = getIndexByExerciseID(id)

  //TODO: Delete element in database

  //allExercises.splice(exerciseIndex, 1)
  document.getElementById(id)?.remove()
}

function cancelEditing(){
  loadCreateTable()
}

function changeData(){
  //TODO: get new values
  //TODO: update Database


  loadCreateTable()
  loadDataTable()
}

export function Configuration() {
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
