const { sendResponseWithShape, assets, configData, speakText } = require('./responseBuilder');

process.env.ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'dev';

function getShape(input) {
    let shape;
    try {
        shape = input.handlerInput.requestEnvelope.context.Viewport.shape;
        return shape;
    } catch (e) {
        shape = 'rectangle';
        return shape;
    }
}

function sendResponse(
    input,
    responseBuilder,
    primaryText,
    mainImage,
    title,
    bodyText,
    shortText = bodyText,
    turnNumber
) {
    const shape = getShape(input);
    let shapeResponse = {};

    shapeResponse = sendResponseWithShape(
        input,
        responseBuilder,
        primaryText,
        mainImage,
        title,
        bodyText,
        shortText,
        shape,
        turnNumber
    );

    return shapeResponse;
}

function fetchIntentForLogging(input) {
    if (input.request.intent) return input.request.intent.name;
    else if (input.request.source) return input.request.source.id;
    else if (input.request.arguments) return input.request.arguments[2];
    else if (input.request.type === 'LaunchRequest') return input.request.type;
    else return 'invalid request';
}
module.exports = {
    speakText,
    configData,
    assets,
    sendResponse,
    fetchIntentForLogging,
};
