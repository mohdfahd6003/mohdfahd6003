const { createLogger, format, transports, info } = require('winston');

const { combine, timestamp, printf } = format;

const zipkin = require('zipkin');

const CLSContext = require('zipkin-context-cls');

const ctxImpl = new CLSContext(); // if you want to use CLS(continuation-local-storage)
const config = require('../config');

let requestIp;
let originalUrl;
let method;
let userId;
let fileName;

const tracer = new zipkin.Tracer({
    ctxImpl, // the in-process context
    recorder: new zipkin.ConsoleRecorder(), // For easy debugging.
    sampler: new zipkin.sampler.CountingSampler(0.01), // sample rate 0.01 will sample 1 % of all incoming requests
    traceId128Bit: true, // to generate 128-bit trace IDs. 64-bit (false) is default
    localServiceName: config.appname, // name of this application //config.appname
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
// :trace details -${tracer._sentinelTraceId.traceId}:${tracer._sentinelTraceId.spanId}:${tracer._sentinelTraceId.parentSpanId}

exports.logger = createLogger({
    format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat),
    transports: [
        new transports.File({
            filename: 'info.log',
        }),
        // new transports.Console(),
    ],
});
