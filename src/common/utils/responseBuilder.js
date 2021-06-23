const Alexa = require('ask-sdk-core');
const speakText = require('../content/constants.json');

const { repeatText } = speakText;

const { generateDocument } = require('./templateBuilder');

const assets = require('../content/assets.json');

const { getRandomHint } = require('./hintBuilder');

const displayDirective = 'Alexa.Presentation.APL.RenderDocument';

const configData = require('../../config.json');

function prepareScreenContent(primaryText, bodyText, mainImage) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.primaryText = primaryText;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    dataTemplate.content.headerImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.headerImage
    }`;
    dataTemplate.content.background = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.background
    }`;
    dataTemplate.content.properties = {};
    dataTemplate.content.properties.hint = getRandomHint();
    dataTemplate.content.transformers = [];
    dataTemplate.content.transformers[0] = {
        inputPath: 'hint',
        outputName: 'transformedHintText',
        transformer: 'textToHint',
    };
    return dataTemplate;
}

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
            const dataTemplate = prepareScreenContent(title, bodyText, mainImage);
            responseBuilder.addDirective({
                type: displayDirective,
                document: displayTemplate,
                datasources: dataTemplate,
            });
            console.log('response', displayTemplate);
        } catch (e) {
            console.log('error', e);
        }
    }

    return responseBuilder;
}

module.exports = {
    sendResponse,
    prepareScreenContent,
    assets,
    displayDirective,
    configData,
    repeatText,
    speakText,
};
