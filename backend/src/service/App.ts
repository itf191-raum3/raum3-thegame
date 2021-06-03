// Temporarily has router responsibilities, will be rewritten later
import express, {Request, Response} from "express";
import { ApiRouter } from "@/service/router/ApiRouter";
import { exerciseApi } from "@/config/routes/ExerciseApiRoutes"

export const app = express();

app.use(express.json());
app.use("/api/", new ApiRouter(exerciseApi).router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello World!"});
});