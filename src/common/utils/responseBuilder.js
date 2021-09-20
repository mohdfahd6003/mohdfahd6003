const Alexa = require('ask-sdk-core');
const speakText = require('../content/constants.json');

const { repeatText } = speakText;

const { generateRectDocument, generateRoundDocument } = require('./templateBuilder');

const assets = require('../content/assets.json');

const { dataLib } = require('./dataBuilders/dataBuilder');

const displayDirective = 'Alexa.Presentation.APL.RenderDocument';

const configData = require('../../config.json');

function createBasic(responseBuilder, primaryText, title, bodyText, mainImage) {
    responseBuilder.addPromptFragment(primaryText);
    responseBuilder.addRepromptFragment(repeatText);
    responseBuilder.withStandardCard(title, bodyText, mainImage, mainImage);
    return responseBuilder;
}

function checkForScreen(input) {
    if (Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)['Alexa.Presentation.APL'])
        return true;
    else return false;
}

function prepareDirective(responseBuilder, displayTemplate, dataTemplate) {
    responseBuilder.addDirective({
        type: displayDirective,
        document: displayTemplate,
        datasources: dataTemplate,
    });
    return responseBuilder;
}

function sendResponseWithShape(
    input,
    responseBuilder,
    primaryText,
    mainImage,
    title,
    bodyText,
    shortText,
    shape,
    turnNumber = '2'
) {
    responseBuilder = createBasic(responseBuilder, primaryText, title, bodyText, mainImage);
    console.log('short text is :', shortText);
    console.log('shape is :', shape);

    if (checkForScreen(input)) {
        try {
            let displayTemplate = {};
            let dataTemplate;
            shortText = shortText || bodyText;
            if (shape === 'ROUND') {
                displayTemplate = generateRoundDocument(turnNumber);
                dataTemplate = dataLib.prepareScreenContentRound(
                    title,
                    shortText,
                    mainImage,
                    turnNumber
                );
            } else {
                displayTemplate = generateRectDocument(turnNumber);
                dataTemplate = dataLib.prepareScreenContentRect(
                    title,
                    shortText,
                    mainImage,
                    turnNumber
                );
            }

            responseBuilder = prepareDirective(responseBuilder, displayTemplate, dataTemplate);
        } catch (e) {
            console.log('error', e);
        }
    }

    return responseBuilder;
}

module.exports = {
    sendResponseWithShape,
    assets,
    displayDirective,
    configData,
    repeatText,
    speakText,
};
