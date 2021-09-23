const assets = require('../../content/assets.json');
const configData = require('../../../config.json');
const { makeCapital } = require('./general.data');
const catalogueTitles = require('../../content/catalogue.title.json');
const mapRoundTitle = require('../../content/roundTitleMap.json');

function prepareScreenContentRound(title, bodyText, mainImage, turnNumber) {
    const dataTemplate = {};
    dataTemplate.content = {};
    dataTemplate.content.title = makeCapital(mapRoundTitle[title] ? mapRoundTitle[title] : title);
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
        }/${assets.Images.textListBackground}`;
        dataTemplate.textListData = createTextListData();
    }
    return dataTemplate;
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

exports.prepareScreenContentRound = prepareScreenContentRound;
