import express from "express";
import { ApiRouter } from "../ApiRouter";
import { fakeRoutes } from "./routes";

export async function mockServer() {
  const app = express();

  app.use(express.json());
  app.use(new ApiRouter(fakeRoutes).router);

  return app;
}