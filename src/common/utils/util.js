const {
    sendResponse,
    prepareScreenContent,
    assets,
    displayDirective,
    configData,
    repeatText,
    speakText,
} = require('./responseBuilder');

process.env.ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'dev';

function getShape(input) {
    try {
        const { shape } = input.handlerInput.requestEnvelope.context.Viewport;
        return shape;
    } catch (e) {
        const shape = '';
        return shape;
    }
}

const displayTemplate = {};

module.exports = {
    prepareScreenContent,
    displayDirective,
    displayTemplate,
    speakText,
    repeatText,
    configData,
    assets,
    sendResponse,
};
