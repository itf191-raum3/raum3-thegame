import {app} from "@/App";
import { readFileSync } from "fs";
import * as https from "https";
import * as http from "http";

export class Server {
    start() {
        const privateKey = readFileSync('/home/raum3/certs/privkey.pem', 'utf8');
        const certificate = readFileSync('/home/raum3/certs/cert.pem', 'utf8');
        const ca = readFileSync('/home/raum3/certs/chain.pem', 'utf8');

        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };

        const httpServer = http.createServer(app);
        const httpsServer = https.createServer(credentials, app);

        httpServer.listen(80, () => {
            console.log('HTTP Server running on port 80');
        });

        httpsServer.listen(443, () => {
            console.log('HTTPS Server running on port 443');
        });
    }
}