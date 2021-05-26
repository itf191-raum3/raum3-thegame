import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png'
import './Configuration.css'
import { AppBar, Tab, Table, Tabs } from "@material-ui/core";
import { IExercise } from '../../../../common/src/entities/IExercise';

// Aufgaben[] getallexcersise (subject)
// statusCode deleteExcesise (ID)
// statusCode update (Aufgabe)
// UUID create (Aufgabe) 

  //Aufgabe
    //ID
    //LAbel
    //Possi
    //correct
    //Difficuly

var allExercises = new Array<IExercise>()

function loadEditTable(idStr:number){

  var manantoryRows = 
    <table className="editTabel">
      <tr>
        <th>Schwierigkeit</th>
        <th>Aufgabe</th>
        <th>Richtige Antworten</th>
        <th>Antwortmöglichkeiten</th>
      </tr>
      <tr className="information">
        <td className="difficulty"><input type="text" id="labelChange" placeholder="Schwierigkeitsstufe"/></td>
        <td className="label"><input type="text" id="labelChange" placeholder="Aufgabenbeschreibung"/></td>
        <td className="correctAnswers"><input type="text" id="fname" placeholder="Richtige Antworte"/></td>
        <td className="allChoices"><input type="text" id="fname" placeholder="Antwortmöglichkeit"/></td>
        <td className="deleteBnt"><img src={deleteIcon} alt="Löschen" className="bntLogo" onClick={() => (cancelEditing())}/></td>
        <td className="acceptBnt"><img src={acceptIcon} alt="Bearbeiten" className="bntLogo"onClick={() => (changeData())}/></td>
      </tr>
      <tr className="moreAnswers">
        <td/>
        <td/>
        <td className="correctAnswers"><input type="text" id="fname" placeholder="Richtige Antworte"/></td>
        <td className="allChoices"><input type="text" id="fname" placeholder="Antwortmöglichkeit"/></td>
      </tr>
    </table>

  var optionalRow =
    <tr className="moreAnswers">
      <td/>
      <td/>
      <td className="correctAnswers"><input type="text" id="fname" placeholder="Richtige Antworte"/></td>
      <td className="allChoices"><input type="text" id="fname" placeholder="Antwortmöglichkeit"/></td>
    </tr>

    return(manantoryRows)
}

function getDataRow(id:number){
  const idStr = id+""
  const exercise = allExercises[id]

  const label = exercise.label
  const difficulty = exercise.difficulty
  const correctAnswers = exercise.correctAnswers
  const possibleAnswers = exercise.possibleAnswers

  const htmlString = '<tr id='+idStr+'>'+
      '<td className="difficulty">'+difficulty+'</td>'+
      '<td className="label">'+label+'</td>'+
      '<td className="correctAnswers">'+correctAnswers+'</td><td className="allChoices">'+possibleAnswers+'</td>'+
      '<td className="deleteBnt"><img src='+deleteIcon+' alt="Löschen" className="bntLogo" onClick={() => (deleteDataSet('+idStr+'))}/></td>'+
      '<td className="editBnt"><img src='+editIcon+' alt="Bearbeiten" className="bntLogo" onClick={() => (editDataSet('+idStr+'))}/></td>'+
    '</tr>'
  return htmlString
}

function getShowingTable(){
  let dataTabel = document.getElementById("showingTabel")?.getElementsByTagName("table").item(0)
  for (let index = 0; index < allExercises.length; index++) {
    dataTabel?.insertAdjacentHTML("beforeend", getDataRow(index))
  }
}

function loadTableStructure(){
  return(
    <table className="dataTabel">
      <tr>
        <th>Schwierigkeit</th>
        <th>Aufgabe</th>
        <th>Richtige Antworten</th>
        <th>Antwortmöglichkeiten</th>
      </tr>
    </table>
  );
}

function loadSubject(subject: string){
  allExercises = []//Get all exercises



// bekomme von server Aufgaben[]
}

function addDataSet(){
  
}

function editDataSet(id: string){

}

function deleteDataSet(id: string){

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
            <Tab label="Software-Entwicklung"  onClick={() => (loadSubject("AE"))}/>
            <Tab label="Netzwerk-Technik" onClick={() => (loadSubject("ITS"))}/>
            <Tab label="Deutsch" onClick={() => (loadSubject("D"))}/>
          </Tabs>
          </AppBar>
        </div>
        <div id="workingTable">
          {loadEditTable(0)}
          <br /><br />
        </div>
        <div id="showingTabel">
          {loadTableStructure()}
        </div>
      </body>
    </div>
  );
}