import winston from "winston";
import DBTransport from "./dbTransport.js";

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp()),
    defaultMeta: {
        service: 'User-Service',
    },
    transports: [
        new DBTransport()
    ],
})

