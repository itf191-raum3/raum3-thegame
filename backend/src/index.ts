import "reflect-metadata";
import {createConnection} from "typeorm";
import {Server} from "@/Server";
import {logger} from "@/helpers/Logger";

const server = new Server();

createConnection().then(connection => {
    logger.info("Database connected");
});

server.start();