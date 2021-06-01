const { createLogger, format, transports, info } = require('winston');

const { combine, timestamp, printf } = format;

const myFormat = printf(
    // eslint-disable-next-line no-shadow
    ({ level, message, timestamp, requestId, intent, locale, timestampReq }) => {
        return `${timestamp} : ${timestampReq}${level}:${requestId}: ${intent} : ${locale}- ${message}`;
    }
);

exports.logger = createLogger({
    format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat),
    transports: [new transports.Console()],
});
