const { createLogger, format, transports, info } = require('winston');

const { combine, timestamp, printf } = format;

const myFormat = printf(
    ({
        level,
        message,
        // eslint-disable-next-line no-shadow
        timestamp,
        requestId,
        intentType,
        intentName,
        locale,
        timestampReq,
        sessionId,
    }) => {
        return `${timestamp} : ${timestampReq}: ${level}:${requestId}: ${sessionId} :${intentType} : ${intentName} : ${locale}- ${message}`;
    }
);

exports.logger = createLogger({
    format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat, format.json()),
    transports: [
        //    new transports.File({
        //       filename: 'info.log',
        //    }),
        new transports.Console(),
    ],
});
