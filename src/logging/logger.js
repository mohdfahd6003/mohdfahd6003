const { createLogger, format, transports, info } = require('winston');

const { combine, timestamp, printf } = format;

const zipkin = require('zipkin');

const CLSContext = require('zipkin-context-cls');

const ctxImpl = new CLSContext();
const config = require('../config');

let requestIp;
let originalUrl;
let method;
let userId;
let fileName;

const tracer = new zipkin.Tracer({
    ctxImpl,
    recorder: new zipkin.ConsoleRecorder(),
    sampler: new zipkin.sampler.CountingSampler(0.01),
    traceId128Bit: true,
    localServiceName: config.appname,
});

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
        return `${timestamp} : ${timestampReq}: ${level}:${requestId}: ${sessionId} :${intentType} : ${intentName} : ${locale}- ${message}- traceeeee : traiceid -${tracer._sentinelTraceId.traceId}:spanId - ${tracer._sentinelTraceId.spanId}:parentSpantId : ${tracer._sentinelTraceId.parentSpanId}`;
    }
);

exports.logger = createLogger({
    // format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat),
    transports: [new transports.Console()],
});
