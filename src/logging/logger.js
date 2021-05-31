const { createLogger, format, transports, info } = require('winston');

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, time }) => {
    return `${timestamp} ${level}: ${message}`;
});

exports.logger = createLogger({
    format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat),
    transports: [new transports.Console()],
});
