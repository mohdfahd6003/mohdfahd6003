const Alexa = require('ask-sdk-core');

const displayDirective = 'Alexa.Presentation.APL.RenderDocument';
const displayTemplate = require('./content/commonAPL.json');
const speakText = require('./content/constants.json');

const { repeatText } = speakText;
const assets = require('./content/assets.json');

const env = process.env.ENVIRONMENT;
const configData = require('../config.json');

const imageCatalog = addCloudFront();

function prepareScreenContent(primaryText, bodyText, mainImage) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.primaryText = primaryText;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    return dataTemplate;
}

function renderGeneralFunction(input, responseBuilder, primaryText, mainImage, title, bodyText) {
    responseBuilder.addPromptFragment(primaryText);
    responseBuilder.addRepromptFragment(repeatText);
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

function addCloudFront() {
    const imageList = {};
    const cloudFrontUrl = configData[env].cloudfront;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in assets.Images) {
        if (Object.hasOwnProperty.call(assets.Images, key)) {
            const element = assets.Images[key];
            imageList[key] = `https://${cloudFrontUrl}/${element}`;
        }
    }
    return imageList;
}
module.exports = {
    prepareScreenContent,
    displayDirective,
    displayTemplate,
    speakText,
    repeatText,
    imageCatalog,
    renderGeneralFunction,
};
