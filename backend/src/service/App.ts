// Temporarily has router responsibilities, will be rewritten later
import {Request, Response} from "express";

const express = require("express");

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Hello World!" });
});