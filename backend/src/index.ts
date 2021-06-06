import "reflect-metadata";
import {createConnection} from "typeorm";
import {Server} from "@/Server";
import {GameSessionService} from "@/service/GameSessionService";

const server = new Server();

createConnection().then(connection => {
    console.log("Connected i guess");
});

server.start();