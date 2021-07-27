const assets = require('../content/assets.json');

const { getRandomHint } = require('./hintBuilder');

const configData = require('../../config.json');

const catalogueTitles = require('../content/catalogue.title.json');

function prepareScreenContent(title, bodyText, mainImage, isWelcome) {
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
    // if (isWelcome) dataTemplate.catalogueData = createCatalogueData();
    if (isWelcome) dataTemplate.gridListData = hardCodeGridData();
    return dataTemplate;
}

function hardCodeGridData() {
    return {
        listItemsToShow: [
            {
                listItemText: 'Heart Attacks',
                sequenceNumber: '1',
                id: 'heartAttackId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/During_a_Heart_Attack.jpg',
            },
            {
                listItemText: 'Warning Signs of Stroke',
                sequenceNumber: '2',
                id: 'strokeId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/ASA_FAST_Warning_Signs.jpg',
            },
            {
                listItemText: 'Burns',
                sequenceNumber: '3',
                id: 'burnId',
                imageUrl:
                    'https://dtzf6dz2qpnrm.cloudfront.net/images/Burn_under_Running_Water_AdultSink.jpg',
            },
            {
                listItemText: 'Dehydration',
                sequenceNumber: '4',
                id: 'dehydrationId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/Dehydration_Water.jpg',
            },
            {
                listItemText: 'Cut',
                sequenceNumber: '5',
                id: 'cutId',
                imageUrl:
                    'https://dtzf6dz2qpnrm.cloudfront.net/images/Dressing_Gauze_Pad_3_Adult.jpg',
            },
            {
                listItemText: 'Nose bleeding',
                sequenceNumber: '6',
                id: 'noseBleedId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/Nose_w_type.jpg',
            },
            {
                listItemText: 'Poison',
                sequenceNumber: '7',
                id: 'poisonId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/Warning_Signs.jpg',
            },
            {
                listItemText: 'Choke',
                sequenceNumber: '8',
                id: 'chokeId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/Chest_Thrust_AdultFloor.jpg',
            },
            {
                listItemText: 'Learn CPR',
                sequenceNumber: '9',
                id: 'cprId',
                imageUrl: 'https://dtzf6dz2qpnrm.cloudfront.net/images/Fainting_Man.jpg',
            },
        ],
    };
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
    catalogueData.itemList = gridData;
    return catalogueData;
}

exports.prepareScreenContent = prepareScreenContent;
