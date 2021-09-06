const assets = require('../content/assets.json');

const { getRandomHint } = require('./hintBuilder');

const configData = require('../../config.json');

const catalogueTitles = require('../content/catalogue.title.json');

function prepareScreenContentRound(title, bodyText, mainImage, turnNumber) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.title = title;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    dataTemplate.content.headerImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.headerImage
    }`;
    dataTemplate.content.logo = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
        assets.Images.logo
    }`;
    if (turnNumber === '1') {
        dataTemplate.content.textListBackground = `https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Images.gridBackground}`;
        dataTemplate.textListData = createTextListData();
    }
    return dataTemplate;
}

function prepareScreenContentRect(title, bodyText, mainImage, turnNumber) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.title = title;
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
    if (turnNumber === '1') {
        dataTemplate.content.gridBackground = `https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Images.gridBackground}`;
        dataTemplate.catalogueData = createCatalogueData();
    }
    return dataTemplate;
}

function makeCapital(nameString) {
    if (nameString === 'cpr') return 'CPR';
    else
        return nameString
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

function createTextListData() {
    const textListData = {};
    const textArray = [];
    let sequenceNumber = 1;
    Object.keys(catalogueTitles).forEach((element) => {
        const textElement = {};
        textElement.id = element;
        textElement.parentId = 0;
        textElement.primaryText = makeCapital(catalogueTitles[element]);
        textElement.sequence = sequenceNumber++;
        textElement.description = '';
        textArray.push(textElement);
    });
    textListData.itemList = textArray;
    return textListData;
}

function createCatalogueData() {
    const catalogueData = {};
    const gridData = [];
    const images = assets.Images.explainTreatment;
    let sequenceNumber = 1;
    Object.keys(catalogueTitles).forEach((element) => {
        const gridElement = {};
        gridElement.id = element;
        gridElement.parentId = 0;
        gridElement.thumbnailSrc = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            images[element]
        }`;
        gridElement.title = makeCapital(catalogueTitles[element]);
        gridElement.imageSrc = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            images[element]
        }`;
        gridElement.sequence = sequenceNumber++;
        gridElement.description = '';
        gridElement.subTitle = '';
        gridElement.hint = '';
        gridData.push(gridElement);
    });
    catalogueData.itemList = gridData;
    return catalogueData;
}

exports.dataLib = { prepareScreenContentRect, prepareScreenContentRound };
