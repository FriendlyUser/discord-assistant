// ignore error
import {Logger, LoggerOptions, transports, createLogger,  format } from "winston"
const defaultLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug'

// We might want to do something on rotation?
// rotateTransport.on("rotate", (oldFilename, newFilename) => {
//     // do something fun
// });

const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    defaultMeta: { service: 'user-service' },
    transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
    ]
};

const logger: Logger = createLogger(options);

if (process.env.NODE_ENV === "develop") {
    logger.add(new transports.Console({
        format: format.simple()
      }));
}

export { logger };