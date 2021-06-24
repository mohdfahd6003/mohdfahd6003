const Alexa = require('ask-sdk-core');
const speakText = require('../content/constants.json');

const { repeatText } = speakText;

const { generateDocument } = require('./templateBuilder');

const assets = require('../content/assets.json');

const dataBuilder = require('./dataBuilder');

const displayDirective = 'Alexa.Presentation.APL.RenderDocument';

const configData = require('../../config.json');

function sendResponse(
    input,
    responseBuilder,
    primaryText,
    mainImage,
    title,
    bodyText,
    iswelcome = false
) {
    responseBuilder.addPromptFragment(primaryText);
    responseBuilder.addRepromptFragment(repeatText);
    responseBuilder.withStandardCard(title, bodyText, mainImage, mainImage);

    if (
        Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)['Alexa.Presentation.APL']
    ) {
        try {
            const displayTemplate = generateDocument(iswelcome);
            const dataTemplate = dataBuilder.prepareScreenContent(
                title,
                bodyText,
                mainImage,
                iswelcome
            );
            responseBuilder.addDirective({
                type: displayDirective,
                document: displayTemplate,
                datasources: dataTemplate,
            });
            // console.log('response', displayTemplate);
        } catch (e) {
            console.log('error', e);
        }
    }

    return responseBuilder;
}

module.exports = {
    sendResponse,
    assets,
    displayDirective,
    configData,
    repeatText,
    speakText,
};
