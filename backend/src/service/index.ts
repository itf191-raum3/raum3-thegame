import "reflect-metadata";
import {createConnection} from "typeorm";
import {Exercise} from "@/entities/Exercise";

createConnection().then(async connection => {
    const test = connection.manager.create<Exercise>(Exercise, {
        id: 1,
        correctAnswers: ["right1", "right2"],
        label:"bloop",
    });
    await connection.manager.save(test);
    await connection.manager.find<Exercise>(Exercise).then(e => {
        e.forEach(result => {
            console.log(result.correctAnswers[1]);
        })
    })
});