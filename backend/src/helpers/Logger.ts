import {ILogObject, Logger} from "tslog";
import {appendFileSync, existsSync, mkdirSync} from "fs";

function logToTransport(logObject: ILogObject) {
    const logs = "./logs";
    if (!existsSync(logs)) {
        mkdirSync(logs)
    }
    appendFileSync(`${logs}/main.log`, JSON.stringify(logObject) + "\n");
}

export const logger: Logger = new Logger();

logger.attachTransport(
    {
        silly: logToTransport,
        debug: logToTransport,
        trace: logToTransport,
        info: logToTransport,
        warn: logToTransport,
        error: logToTransport,
        fatal: logToTransport
    },
    "debug"
);