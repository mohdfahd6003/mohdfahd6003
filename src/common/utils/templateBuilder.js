const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilders/layoutBuilder');

const { getResources } = require('./resourceBuilder');

const { catalogueCard } = require('./layoutBuilders/catalogue/getCard.catalogue');

function generateDocument(isWelcome) {
    let document = {};
    document = {
        type: 'APL',
        license:
            'Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/',
        version: '1.7',
        description: 'AHA alexa skill',
        theme: 'dark',
        import: getImports(),
        mainTemplate: getMainTemplate(isWelcome),
        settings: getAplConfig(),
        styles: getStyles(),
        resources: getResources(),
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
    return [
        {
            name: 'alexa-layouts',
            version: '1.3.0',
        },
        {
            name: 'alexa-styles',
            version: '1.2.0',
        },
        {
            name: 'alexa-viewport-profiles',
            version: '1.2.0',
        },
    ];
}
function getStyles() {
    return ahaStyle;
}

function getTemplate(isWelcome) {
    const itemArray = [];
    const firstContainer = {};
    firstContainer.type = 'Container';
    firstContainer.item = [];
    firstContainer.item = layouts.getRectangleLayout(isWelcome);
    itemArray.push(firstContainer);
    return itemArray;
}
function getMainTemplate(isWelcome) {
    let mainTemplate = {};
    mainTemplate = {
        parameters: ['payload'],
        items: getTemplate(isWelcome),
    };
    return mainTemplate;
}

exports.generateDocument = generateDocument;
