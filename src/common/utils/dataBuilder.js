const assets = require('../content/assets.json');

const { getRandomHint } = require('./hintBuilder');

const configData = require('../../config.json');

const catalogueTitles = require('../content/catalogue.title.json');

function prepareScreenContent(primaryText, bodyText, mainImage, isWelcome) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.primaryText = primaryText;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    dataTemplate.content.headerImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.headerImage
    }`;
    dataTemplate.content.logo = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.logo
    }`;
    dataTemplate.content.properties = {};
    dataTemplate.content.properties.hint = getRandomHint();
    dataTemplate.content.transformers = [];
    dataTemplate.content.transformers[0] = {
        inputPath: 'hint',
        outputName: 'transformedHintText',
        transformer: 'textToHint',
    };
    if (isWelcome) dataTemplate.pairImageTitle = createCatalogueData();
    return dataTemplate;
}

function createCatalogueData() {
    const pairImageTitle = {};
    const images = assets.Images;
    Object.keys(catalogueTitles).forEach((element) => {
        pairImageTitle[catalogueTitles[element]] = `https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${images[element]}`;
    });
    return pairImageTitle;
}

exports.prepareScreenContent = prepareScreenContent;
