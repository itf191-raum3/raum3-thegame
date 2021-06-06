import express from "express";
import {forEach, isUndefined} from "lodash";
import {logger} from "../../helpers/Logger";
import {ApiRoute} from "../../../types/common";

export class ApiRouter {
    private _router = express.Router();
    readonly routes: Array<ApiRoute>;

    constructor(routes: Array<ApiRoute>) {
        this.routes = routes;
        logger.info("Initializing routes...");
        forEach(this.routes, (route) => {
            if (!isUndefined(route.method)) {
                if (route.method === "GET") {
                    this._router.get(route.path, route.handler);
                } else if (route.method === "POST") {
                    this._router.post(route.path, route.handler);
                } else if (route.method === "PUT") {
                    this._router.put(route.path, route.handler);
                } else if (route.method === "DELETE") {
                    this._router.delete(route.path, route.handler);
                }
                logger.info("Initialized route", route.method, route.path);
            } else {
                logger.error("Cannot initialize route", route.method, route.path, ": method unknown or not supported");
            }
        });
    }

    get router() {
        return this._router;
    }
}