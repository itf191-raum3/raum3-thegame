import deleteIcon from './delete_icon.png';
import editIcon from './edit_icon.png';
import './Configuration.css'
import { AppBar, Tab, Tabs } from "@material-ui/core";


function Configuration() {
  return (
    <div className="Configuration">
      <header className="Config-GUI">
        
      </header>
      <body>
        <div className="main">
          <AppBar position="static">
          <Tabs value={"subject"} aria-label="simple tabs example">
            <Tab label="Software-Entwicklung"/>
            <Tab label="Netzwerk-Technik"/>
            <Tab label="Deutsch"/>
          </Tabs>
          </AppBar>

          <div>
            <table>
              <tr>
                <th>Id</th>
                <th>Aufgabe</th>
                <th>Richtige Antworten</th>
                <th>Antwortmöglichkeiten</th>
                <th>Löschen</th>
                <th>Bearbeiten</th>
              </tr>
              <tr id="1">
                <td className="id"></td>
                <td className="exercise"></td>
                <td className="correctAnswers"></td>
                <td className="allChoices"></td>
                <td className="deleteBnt"><button><img src={deleteIcon} alt="Löschen" className="bntLogo"/></button></td>
                <td className="editBnt"><button><img src={editIcon} alt="Bearbeiten" className="bntLogo"/></button></td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Configuration;