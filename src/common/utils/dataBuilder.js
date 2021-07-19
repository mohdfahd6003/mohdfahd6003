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
    if (isWelcome) dataTemplate.catalogueData = createCatalogueData();
    return dataTemplate;
}

function createCatalogueData() {
    const catalogueData = {};
    const gridData = [];
    const images = assets.Images;
    let sequenceNumber = 1;
    Object.keys(catalogueTitles).forEach((element) => {
        const gridElement = {};
        gridElement.id = element;
        gridElement.parentId = 0;
        gridElement.thumbnailSrc = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            images[element]
        }`;
        gridElement.title = catalogueTitles[element];
        gridElement.imageSrc = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            images[element]
        }`;
        gridElement.sequence = sequenceNumber++;
        gridElement.description = '';
        gridElement.subTitle = '';
        gridElement.hint = '';
        gridData.push(gridElement);
    });
    console.log(gridData);
    catalogueData.itemList = gridData;
    return catalogueData;
}

exports.prepareScreenContent = prepareScreenContent;
