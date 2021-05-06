import { Request, Response } from "express";

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