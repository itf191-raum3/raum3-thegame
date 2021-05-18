import {Request, Response} from "express";

interface ApiRoute {
  path: string,
  method: string,
  handler: (req: Request, res: Response) => void
}

interface PageRoute {
  path: string,
  handler: (req: Request, res: Response) => void
}