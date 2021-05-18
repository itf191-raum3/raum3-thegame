import { logger } from "../../../helpers/Logger";
import { Request, Response } from "express";
import { join } from "path";

export const fakeRoutes = [
  {
    path: "/api/test",
    method: "GET",
    handler: (req: Request, res: Response) => {
      res.sendStatus(200);
    }
  },
  {
    path: "/api/test",
    method: "POST",
    handler: (req: Request, res: Response) => {
      res.sendStatus(200);
    }
  },
  {
    path: "/api/test",
    method: "PUT",
    handler: (req: Request, res: Response) => {
      res.sendStatus(200);
    }
  },
  {
    path: "/api/test",
    method: "DELETE",
    handler: (req: Request, res: Response) => {
      res.sendStatus(200);
    }
  }
]

export const fakePages = [
  {
    path: "/page/test",
    handler: (req: Request, res: Response) => {
      const filePath = join(__dirname + "/testPage.html");
      res.sendFile(filePath, (err) => {
        logger.error(err);
      });
    }
  }
]