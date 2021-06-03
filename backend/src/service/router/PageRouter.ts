import express from "express";
import { forEach } from "lodash";
import { logger } from "../../helpers/Logger";  //TODO: Figure out why tests fail when this is @/helpers/Logger
import { PageRoute } from "../../../types/common";

export class PageRouter {
  private _router = express.Router();
  readonly routes : Array<PageRoute>;

  constructor(routes: Array<PageRoute>) {
    this.routes = routes;
    logger.info("Initializing routes...");
    forEach(this.routes, (route) => {
      this._router.get(route.path, route.handler);
      logger.info("Initialized page", route.path);
    });
  }

  get router() {
    return this._router;
  }
}