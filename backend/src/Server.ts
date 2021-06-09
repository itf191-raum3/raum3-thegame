import {app} from "@/App";
import { readFileSync } from "fs";
import * as https from "https";
import * as http from "http";

export class Server {
    start() {
        const privateKey = readFileSync('/etc/letsencrypt/live/raum3.gamingclubgermany.net/privkey.pem', 'utf8');
        const certificate = readFileSync('/etc/letsencrypt/live/raum3.gamingclubgermany.net/cert.pem', 'utf8');
        const ca = readFileSync('/etc/letsencrypt/live/raum3.gamingclubgermany.net/chain.pem', 'utf8');

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