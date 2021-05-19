//server.js
const app = require("./app");

export class Server {
    start() {
        app.listen(5678, () => {
            console.log("Example app listening on port 5678!");
        });
    }
}