import "reflect-metadata";
import {createConnection} from "typeorm";
import {Server} from "@/service/Server";

const server = new Server();

createConnection().then(async connection => {
});

server.start();