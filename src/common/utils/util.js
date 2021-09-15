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

module.exports = {
    speakText,
    configData,
    assets,
    sendResponse,
};
