const { sendResponseWithShape, assets, configData, speakText } = require('./responseBuilder');

process.env.ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'dev';

function getShape(input) {
    let shape;
    try {
        shape = input.handlerInput.requestEnvelope.context.Viewport;
        return shape;
    } catch (e) {
        shape = 'rectangle';
        return shape;
    }
}

function sendResponse(input, responseBuilder, primaryText, mainImage, title, bodyText, iswelcome) {
    const shape = getShape(input);
    let shapeResponse = {};

    shapeResponse = sendResponseWithShape(
        input,
        responseBuilder,
        primaryText,
        mainImage,
        title,
        bodyText,
        shape,
        iswelcome
    );

    return shapeResponse;
}

module.exports = {
    speakText,
    configData,
    assets,
    sendResponse,
};
