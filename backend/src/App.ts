// Temporarily has router responsibilities, will be rewritten later (will never happen)
import express, {Request, Response} from "express";
import {ApiRouter} from "@/service/router/ApiRouter";
import {exerciseApi} from "@/config/routes/ExerciseApiRoutes"
import {subjectApi} from "@/config/routes/SubjectApiRoutes";
import {gameSessionApi} from "@/config/routes/GameSessionApiRoutes";
import {PageRouter} from "@/service/router/PageRouter";
import {pages} from "@/config/routes/PageRoutes";
import {resolve} from "path";
import { auth } from "@/config/routes/AuthenticationRoutes";

export const app = express();

app.use(express.json());
app.use("/api/", new ApiRouter(exerciseApi).router);
app.use("/api/", new ApiRouter(subjectApi).router);
app.use("/api/", new ApiRouter(gameSessionApi).router);
app.use("/auth/", new ApiRouter(auth).router);

app.use("/", new PageRouter(pages).router);
app.use("/", express.static(resolve(__dirname, "./public/build")));

app.get("/manage/health", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello World!"});
});