import "reflect-metadata";
import {createConnection} from "typeorm";
import {Server} from "@/Server";

const server = new Server();

createConnection().then();

server.start();