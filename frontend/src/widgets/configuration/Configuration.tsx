import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import acceptIcon from './accept_icon.png'
import './Configuration.css'
import { AppBar, Tab, Tabs } from "@material-ui/core";

function dataRow(idStr:string){
  return(
    <tr id={idStr}>
      <td className="id">{idStr}</td>
      <td className="label"></td>
      <td className="correctAnswers"></td>
      <td className="allChoices"></td>
      <td className="deleteBnt"><img src={deleteIcon} alt="Löschen" className="bntLogo"/></td>
      <td className="editBnt"><img src={editIcon} alt="Bearbeiten" className="bntLogo"/></td>
    </tr>
  );
}

function loadTable(subject: string){

}

function addDataSet(){

}

function editDataSet(id: string){

}

function deleteDataSet(id: string){

}

function Configuration() {
  
  return (
    <div className="Configuration">
      <header className="Config-GUI">
        
      </header>
      <body>
        <div className="main">
          <AppBar position="static">
          <Tabs value={"subject"} aria-label="simple tabs example">
            <Tab label="Software-Entwicklung"  onClick={() => (loadTable("AE"))}/>
            <Tab label="Netzwerk-Technik"/>
            <Tab label="Deutsch"/>
          </Tabs>
          </AppBar>

          <table className="editTabel">
            <tr>
              <th>Id</th>
              <th>Aufgabe</th>
              <th>Richtige Antworten</th>
              <th>Antwortmöglichkeiten</th>
            </tr>
            <tr className="information">
              <td className="id"></td>
              <td className="label"><input type="text" id="labelChange" placeholder="Aufgabenbeschreibung"/></td>
              <td className="correctAnswers"><input type="text" id="fname" placeholder="Richtige Antworte"/></td>
              <td className="allChoices"><input type="text" id="fname" placeholder="Antwortmöglichkeit"/></td>
              <td className="deleteBnt"><img src={deleteIcon} alt="Löschen" className="bntLogo"/></td>
              <td className="acceptBnt"><img src={acceptIcon} alt="Bearbeiten" className="bntLogo"/></td>
            </tr>
            <tr className="moreAnswers">
              <td/>
              <td/>
              <td className="correctAnswers"><input type="text" id="fname" placeholder="Richtige Antworte"/></td>
              <td className="allChoices"><input type="text" id="fname" placeholder="Antwortmöglichkeit"/></td>
              <td/>
              <td/>
            </tr>
          </table>

          <table className="dataTabel">
            <tr>
              <th>Id</th>
              <th>Aufgabe</th>
              <th>Richtige Antworten</th>
              <th>Antwortmöglichkeiten</th>
            </tr>
            {dataRow("s")}
          </table>
        </div>
      </body>
    </div>
  );
}

export default Configuration;