import "reflect-metadata";
import {createConnection} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import { Server } from "@/service/Server";
import {ExerciseService} from "@/service/ExerciseService";

const server = new Server();

createConnection().then(async connection => {
});

server.start();