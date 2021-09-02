const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilders/layoutBuilder');

const { getRectResources, getRoundResources } = require('./resourceBuilder');

const { catalogueCard } = require('./layoutBuilders/catalogue/getCard.catalogue');

const { roundCustomWelcome } = require('./layoutBuilders/welcome/getCustomWelcome');

const importList = require('./importBuilder');

function getCommonDoucment() {
    return {
        type: 'APL',
        license:
            'Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/',
        version: '1.7',
        description: 'AHA alexa skill',
        theme: 'dark',
        import: getImports(),
        settings: getAplConfig(),
        styles: getStyles(),
    };
}

function generateRectDocument(turnNumber) {
    const rectDocument = getCommonDoucment();
    rectDocument.mainTemplate = getMainTemplate(turnNumber, 'rect');
    rectDocument.resources = getRectResources();
    rectDocument.layouts = getCustomLayouts(turnNumber, 'rect');
    return rectDocument;
}

function generateRoundDocument(turnNumber) {
    const roundDocument = getCommonDoucment();
    roundDocument.mainTemplate = getMainTemplate(turnNumber, 'round');
    roundDocument.resources = getRoundResources();
    roundDocument.layouts = getCustomLayouts(turnNumber, 'round');
    return roundDocument;
}

function getCustomLayouts(turnNumber, deviceShape) {
    let customLayout = {};
    if (deviceShape === 'rect' && turnNumber === '1') {
        customLayout = catalogueCard.getcatalogueCard();
    } else if (deviceShape === 'round' && turnNumber === '1') {
        customLayout = roundCustomWelcome.getRoundWelcomeCustomText();
    }
    return customLayout;
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

function getTemplate(turnNumber, deviceShape) {
    const itemArray = [];
    const firstContainer = {};
    firstContainer.type = 'Container';
    firstContainer.item = [];
    if (deviceShape === 'rect') firstContainer.item = layouts.getRectangleLayout(turnNumber);
    else firstContainer.item = layouts.getRoundLayout(turnNumber);
    itemArray.push(firstContainer);
    return itemArray;
}
function getMainTemplate(turnNumber, deviceShape) {
    let mainTemplate = {};
    mainTemplate = {
        parameters: ['payload'],
        items: getTemplate(turnNumber, deviceShape),
    };
    return mainTemplate;
}

module.exports = { generateRectDocument, generateRoundDocument };
