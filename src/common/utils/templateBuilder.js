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

function generateRectDocument(isWelcome) {
    const rectDocument = getCommonDoucment();
    rectDocument.mainTemplate = getMainTemplate(isWelcome, 'rect');
    rectDocument.resources = getRectResources();
    rectDocument.layouts = getCustomLayouts(isWelcome, 'rect');
    return rectDocument;
}

function generateRoundDocument(isWelcome) {
    const roundDocument = getCommonDoucment();
    roundDocument.mainTemplate = getMainTemplate(isWelcome, 'round');
    roundDocument.resources = getRoundResources();
    roundDocument.layouts = getCustomLayouts(isWelcome, 'round');
    return roundDocument;
}

function getCustomLayouts(isWelcome, deviceShape) {
    let customLayout = {};
    if (deviceShape === 'rect' && isWelcome) {
        customLayout = catalogueCard.getcatalogueCard();
    } else if (deviceShape === 'round' && isWelcome) {
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
