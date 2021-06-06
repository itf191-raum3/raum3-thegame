import { NextFunction, Request, Response } from "express";

interface ApiRoute {
  path: string,
  method: string,
  handler: (req: Request, res: Response, next: NextFunction) => any
}

interface PageRoute {
  path: string,
  page: string
}