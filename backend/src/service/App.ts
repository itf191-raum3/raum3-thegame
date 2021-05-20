// Temporarily has router responsibilities, will be rewritten later
import express, {Request, Response} from "express";


export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello World!"});
});