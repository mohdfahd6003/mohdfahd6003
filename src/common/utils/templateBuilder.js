const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilders/layoutBuilder');

const { getRectResources, getRoundResources } = require('./resourceBuilder');

const { catalogueCard } = require('./layoutBuilders/catalogue/getCard.catalogue');

const importList = require('./importBuilder');

function generateRectDocument(isWelcome) {
    let document = {};
    document = {
        type: 'APL',
        license:
            'Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/',
        version: '1.7',
        description: 'AHA alexa skill',
        theme: 'dark',
        import: getImports(),
        mainTemplate: getMainTemplate(isWelcome, 'rect'),
        settings: getAplConfig(),
        styles: getStyles(),
        resources: getRectResources(),
        layouts: getCardLayouts(isWelcome),
    };
    return document;
}

function generateRoundDocument(isWelcome) {
    let document = {};
    document = {
        type: 'APL',
        license:
            'Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/',
        version: '1.7',
        description: 'AHA alexa skill',
        theme: 'dark',
        import: getImports(),
        mainTemplate: getMainTemplate(isWelcome, 'round'),
        settings: getAplConfig(),
        styles: getStyles(),
        resources: getRoundResources(),
        layouts: getCardLayouts(isWelcome),
    };
    return document;
}

function getCardLayouts(isWelcome) {
    let cardLayout = {};
    if (isWelcome) {
        cardLayout = catalogueCard.getcatalogueCard();
    }
    return cardLayout;
}

function getAplConfig() {
    const settings = { supportsResizing: true };
    return settings;
}
function getImports() {
    return importList.getImportList();
}
function getStyles() {
    return ahaStyle;
}

function getTemplate(isWelcome, deviceShape) {
    const itemArray = [];
    const firstContainer = {};
    firstContainer.type = 'Container';
    firstContainer.item = [];
    if (deviceShape === 'rect') firstContainer.item = layouts.getRectangleLayout(isWelcome);
    else firstContainer.item = layouts.getRoundLayout(isWelcome);
    itemArray.push(firstContainer);
    return itemArray;
}
function getMainTemplate(isWelcome, deviceShape) {
    let mainTemplate = {};
    mainTemplate = {
        parameters: ['payload'],
        items: getTemplate(isWelcome, deviceShape),
    };
    return mainTemplate;
}

module.exports = { generateRectDocument, generateRoundDocument };
