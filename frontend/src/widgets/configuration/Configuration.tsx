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

        </div>
      </body>
    </div>
  );
}

export default Configuration;