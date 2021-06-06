import "reflect-metadata";
import {createConnection} from "typeorm";
import {Exercise} from "@/entities/Exercise";
import {ExerciseService} from "@/service/ExerciseService";

createConnection().then(async connection => {
});