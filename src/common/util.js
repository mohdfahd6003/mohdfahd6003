const Alexa = require('ask-sdk-core');

const displayDirective = 'Alexa.Presentation.APL.RenderDocument';
const displayTemplate = require('./content/commonAPL.json');
const speakText = require('./content/constants.json');

const { repeatText } = speakText;
const assets = require('./content/assets.json');

const configData = require('../config.json');

const randData = require('./content/hint.content.json');

const { randomHint } = randData;

process.env.ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'dev';

function getRandomInt() {
    return Math.floor(Math.random() * randomHint.length);
}

function getRandomHint() {
    return randomHint[getRandomInt()];
}
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

function renderGeneralFunction(input, responseBuilder, primaryText, mainImage, title, bodyText) {
    responseBuilder.addPromptFragment(primaryText);
    responseBuilder.addRepromptFragment(repeatText);
    responseBuilder.withStandardCard(title, bodyText, mainImage, mainImage);
    if (
        Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)['Alexa.Presentation.APL']
    ) {
        const dataTemplate = prepareScreenContent(title, bodyText, mainImage);
        responseBuilder.addDirective({
            type: displayDirective,
            document: displayTemplate,
            datasources: dataTemplate,
        });
    }

    return responseBuilder;
}

module.exports = {
    prepareScreenContent,
    displayDirective,
    displayTemplate,
    speakText,
    repeatText,
    configData,
    assets,
    renderGeneralFunction,
};
