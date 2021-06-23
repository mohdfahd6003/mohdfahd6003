const assets = require('../content/assets.json');

const { getRandomHint } = require('./hintBuilder');

const configData = require('../../config.json');

function prepareScreenContent(primaryText, bodyText, mainImage, isWelcome) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.primaryText = primaryText;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    dataTemplate.content.headerImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.headerImage
    }`;
    if (isWelcome) {
        dataTemplate.content.background = `https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Images['welcome.background']}`;
    } else {
        dataTemplate.content.background = `https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Images.background}`;
    }

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

exports.prepareScreenContent = prepareScreenContent;
