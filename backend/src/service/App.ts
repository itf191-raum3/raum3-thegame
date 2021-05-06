// Temporarily has router responsibilities, will be rewritten later
import {Request, Response} from "express";
import express from "express";
import {createConnection} from "typeorm";


export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Hello World!" });
});