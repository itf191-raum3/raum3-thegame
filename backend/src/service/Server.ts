import { app } from "@/service/App"

export class Server {
    start() {
        app.listen(80, () => {
            console.log("App listening on port 80");
        });
    }
}