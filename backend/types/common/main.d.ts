import {Request, Response} from "express";

interface Route {
  path: string,
  method: string,
  handler: (req: Request, res: Response) => void
}