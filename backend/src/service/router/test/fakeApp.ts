import express from "express";
import {ApiRouter} from "../ApiRouter";
import {PageRouter} from "../PageRouter";
import {fakePages, fakeRoutes} from "./routes";

export async function mockServer() {
    const app = express();

    app.use(express.json());
    app.use(new ApiRouter(fakeRoutes).router);
    app.use(new PageRouter(fakePages).router)

    return app;
}