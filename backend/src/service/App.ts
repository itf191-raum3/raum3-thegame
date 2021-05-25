// Temporarily has router responsibilities, will be rewritten later
import express, {Request, Response} from "express";
import { ApiRouter } from "@/service/router/ApiRouter";
import { api } from "@/config/routes/ApiRoutes"

export const app = express();

app.use(express.json());
app.use("/api/", new ApiRouter(api).router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello World!"});
});