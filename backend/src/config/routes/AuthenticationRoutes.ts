import {ApiRoute} from "../../../types/common"
import {NextFunction, Request, Response} from "express";

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const isRightPassword = req.body.password === "Raum3IsSecure!";
    if(isRightPassword) {
        return res.send({ auth: true });
    }

    return res.sendStatus(401);
}

export const auth: Array<ApiRoute> = [
    {
        path: "/",
        method: "POST",
        handler: checkAuthorization
    }
]