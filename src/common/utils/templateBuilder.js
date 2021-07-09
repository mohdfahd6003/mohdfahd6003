const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilders/layoutBuilder');

const { getResources } = require('./resourceBuilder');

function generateDocument(isWelcome) {
    let document = {};
    document = {
        type: 'APL',
        license:
            'Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/',
        version: '1.6',
        description: 'AHA alexa skill',
        theme: 'light',
        import: getImports(),
        mainTemplate: getMainTemplate(isWelcome),
        settings: getAplConfig(),
        styles: getStyles(),
        resources: getResources(),
    };
    return document;
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

function getLayouts(isWelcome) {
    const itemArray = [];
    const layout = {};
    layout.type = 'Container';
    layout.item = [];
    layout.item = layouts.getRectangleLayout(isWelcome);
    itemArray.push(layout);
    return itemArray;
}
function getMainTemplate(isWelcome) {
    let mainTemplate = {};
    mainTemplate = {
        parameters: ['payload'],
        items: getLayouts(isWelcome),
    };
    return mainTemplate;
}

exports.generateDocument = generateDocument;
